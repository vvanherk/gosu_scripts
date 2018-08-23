var pp = Job.slicedPeriod("144373")
//var sub = pp.BasedOn

print(pp)
//print(sub)

//ca.cooperators.pc.rules.RunRules

var allCvbl = pp.AllCoverables

for(cvbl in allCvbl) {
   print("Type of Coverable is: " + typeof cvbl)
   
   var aiContainer = cvbl.AdditionalInterestContainers
   for(ai in aiContainer) {
     var aiDtls = ai.AdditionalInterestDetails
     for(aid in aiDtls) {
       //print(aid.Subtype)
       
       if(aid.AdditionalInterestType == "LEASE" or aid.AdditionalInterestType == "LIEN")
       {
           switch(aid.Subtype) {
             case typekey.AddlInterestDetail.TC_ADDNINSUREDBUILDINTEREST :
             case typekey.AddlInterestDetail.TC_WATERCRAFTADDNINTEREST :
             case typekey.AddlInterestDetail.TC_ARTICLESCHEDULEADDNINTEREST :
             case typekey.AddlInterestDetail.TC_TRAVELTRAILERADDNINTEREST :
                if(true/*aid.ConfirmationRequired*/) {
                  print("Got conditions")
      print("aid.FixedId: " + aid.FixedId)
      print("aid.BasedOn?.FixedId, aid.BasedOn?.Branch?.Job?.JobNumber: " + {aid.BasedOn?.FixedId, aid.BasedOn?.Branch?.Job?.JobNumber})
      //print("aid.DisplayName: " + aid.DisplayName)
      print("aid.Subtype: " + aid.Subtype)
      print("aid.ConfirmationRequired: " + aid.ConfirmationRequired)
      print("aid.AdditionalInterestType: " + aid.AdditionalInterestType)
      print(" ")
                 }
               break
             default:
               //return
           }
           
       }
       
     }
     
   }
  
}

// PolicyPeriodValidation
// pp.AllCoverables*.AdditionalInterestContainers





pp.AllCoverables.each(\ cbl ->{
  print(typeof cbl + " " + { cbl.InsuredItem.Type })
  var containers = cbl.AdditionalInterestContainers
  for (ct in containers) {
    var addlDtls = ct.AdditionalInterestDetails
    for (aid in addlDtls) {
     // print("  " + aid.FixedId + " " + { aid.ID, aid.BasedOn?.FixedId, aid.BasedOn?.Branch?.Job?.JobNumber })
      print("aid.FixedId: " + aid.FixedId)
      print("aid.BasedOn?.FixedId, aid.BasedOn?.Branch?.Job?.JobNumber: " + {aid.BasedOn?.FixedId, aid.BasedOn?.Branch?.Job?.JobNumber})
      //print("aid.DisplayName: " + aid.DisplayName)
      print("aid.Subtype: " + aid.Subtype)
      print("aid.ConfirmationRequired: " + aid.ConfirmationRequired)
      print("aid.AdditionalInterestType: " + aid.AdditionalInterestType)
      print(" ")
    }
  }
  print("")
})




//var aid_lst = find (aid in AddlInterestDetail)
//
//for (aid in aid_lst index i) {
//  print((typeof aid) + " " + { aid.BasedOn, aid.Branch.PolicyNumber, aid.Branch.Job.JobNumber })
//  if (i >= 10) break
//}
