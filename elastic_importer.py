from elasticsearch import helpers, Elasticsearch
import csv

es = Elasticsearch()

with open('./cas.csv') as f:
  index_name = 'cas_neto'
  doctype = 'placa'
  reader = csv.reader(f)
  headers = []
  index = 0
  es.indices.delete(index=index_name, ignore=[400, 404])
  es.indices.create(index=index_name, ignore=400)
  es.indices.put_mapping(
      index=index_name,
      doc_type=doctype,
      ignore=400,
      body={
          doctype: {
              "properties": {
                  "dobcine": {
                      "type": "text"
                        },
                  "2005": {
                      "type": "float",
                  },
                  "2006": {
                      "type": "float",
                  },
                  "2007": {
                      "type": "float",
                  },
                  "2008": {
                      "type": "float",
                  },
                  "2009": {
                      "type": "float",
                  },
                  "2010": {
                      "type": "float",
                  },
                  "2011": {
                      "type": "float",
                  },
                  "2012": {
                      "type": "float",
                  },
                  "2013": {
                      "type": "float",
                  },
                  "2014": {
                      "type": "float",
                  },
                  "2015": {
                      "type": "float",
                  },
                  "2016": {
                      "type": "float",
                  },
                  "2017": {
                      "type": "float",
                  },
                  "2018": {
                      "type": "float",
                  }
                  
              }
          }
      }
  )
  for row in reader:
      try:
          if(index == 0):
              headers = row
          else:
              obj = {}
              for i, val in enumerate(row):
                if(i > 1):
                    obj[headers[i]] = float(val)
                    print(i, val)
                else:
                    obj[headers[i]] = val
                    print(i, val)
              # put document into elastic search
              es.index(index=index_name, doc_type=doctype, body=obj)
              print(obj)

      except Exception as e:
          print('error: ' + str(e) + ' in' + str(index))
      index = index + 1

f.close()
