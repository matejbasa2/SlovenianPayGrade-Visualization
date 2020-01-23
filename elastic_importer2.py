from elasticsearch import helpers, Elasticsearch
import csv

es = Elasticsearch()

with open('./neki.csv') as f:
  index_name = 'vse_dejavnosti_prav5'
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
                  "DEJAVNOST": {
                      "type": "text"
                        },
                  "MESEC": {
                      "type": "text",
                  },
                  "BRUTO_PLACA": {
                      "type": "float",
                  },
                  "NETO_PLACA": {
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
                if(i == 2 or i == 3):
                    obj[headers[i]] = float(val)
                    #print(i, val)
                else:
                    obj[headers[i]] = val
                    #print(i, val)
              #put document into elastic search
              es.index(index=index_name, doc_type=doctype, body=obj)
              #print(obj)

      except Exception as e:
          a=0
          #print('error: ' + str(e) + ' in' + str(index))
      index = index + 1

f.close()
