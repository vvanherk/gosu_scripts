uses gw.api.database.Query

var pp = Job.slicedPeriod("568360")
print(pp)

var docs = find (d in DocProdDocument_CG.DocPrintRequest_CG where d.PolicyPeriod == pp)
for (d in docs) {
  print("  ${typeof d} " + { d.DocProdDocumentCodes_CG.DocumentCode_CG })
  print(d.DocProdDocumentCodes_CG.DocumentCode_CG)
}

// TODO: Learn to use Query API
//var qDocs = Query.make(DocProdPrintRequest_CG)
//qDocs.join("DocCreationRequests")
//print(qDocs)

