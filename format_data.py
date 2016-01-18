import csv
import geojson
import re

from __future__ import print_function

def newFeatureFromRow(row):
  name = row[0]
  type = row[1]
  mass = row[2]
  year = row[4]
  url = row[5]
  lat = row[6]
  lng = row[7]

  try:
    lat_f = float(lat)
  except:
    return None

  try:
    lng_f = float(lng)
  except:
    return None  

  try:
    year_i = int(year)
  except:
    return None


  point = geojson.Point((lng_f, lat_f))
  properties = {"name": name, "type": type, "mass": mass, "year": year_i, "url": url}

  return geojson.Feature(geometry=point, properties=properties)


with open('meteorite.csv') as csvfile:
  reader = csv.reader(csvfile, delimiter=',')
  header = False;
  features = []
  skipped = 0

  for row in reader:
    feature = newFeatureFromRow(row)
    if (feature != None):
      features.append(feature)
    else:
      skipped += 1
  
  featureCollection = geojson.FeatureCollection(features)
  print featureCollection
    
