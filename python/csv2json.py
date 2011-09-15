import os
import sys
import csv
import couchdbkit

dbDomain = "http://livelycode.iriscouch.com/"
dbID = "flights_db"
docID = "flight_doc"

# create server proxy
server = couchdbkit.Server(uri=dbDomain)
db = server.get_or_create_db(dbID)
if docID in db:
  del db[docID]

# create document proxy
flightDoc = couchdbkit.Document()
flightDoc.set_db(db)
flightDoc._id = docID

# creating list of filenames
relativePath = os.path.join(os.getcwd(), "..", "data")
absolutePath = os.path.abspath(relativePath)
fileNames = os.listdir(absolutePath)
filteredFileNames = [file for file in fileNames if os.path.splitext(file)[1] == ".csv"]

# writing content of files to document
for fileName in filteredFileNames:
  fileNameWithoutExtension = os.path.splitext(fileName)[0]
  dbURI = os.path.join(dbDomain, dbID, docID)
  print "reading", fileName
  filePath = os.path.join(absolutePath, fileName)
  csvFile = open(filePath, "rb")
  csvReader = csv.reader(csvFile, delimiter=";")
  flightDoc[fileNameWithoutExtension] = list(csvReader)
  print "writing", fileName, "to", dbURI
  flightDoc.save()
