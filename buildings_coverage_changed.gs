uses gw.api.productmodel.CoveragePattern
uses ca.cooperators.pc.cooputils.RuralDwellingUtils_CG

uses java.util.Map
uses gw.api.productmodel.GrandfatherState


var grandFatherMap : Map<DwellingCovLevel_CG, DwellingCovLevel_CG> = {
    "ruralFD1_FD1" -> "FarmResidentialBasic",
    "ruralFD1_None" -> "FarmResidentialBasicBuilding",
    "ruralNone_FD1" -> "FarmResidentialBasicProperty",
    "ruralFD2_FD2" -> "FarmResidentialClassic",
    "ruralFD2_FD3" -> "FarmResidentialClassic",
    "ruralFD2_None" -> "FarmResidentialClassicBuilding",
    "ruralNone_FD2" -> "FarmResidentialClassicProperty",
    "ruralNone_FD3" -> "FarmResidentialClassicProperty",
    "ruralFD2_FD4" -> "FarmResidentialPrestige",
    "ruralFD4_None" -> "FarmResidentialPrestigeBuilding",
    "ruralFD4_FD4" -> "FarmHomeownersPrestige",
    "ruralNone_FD4" -> "FarmResidentialPrestigeProperty"
  }


var pp=job.slicedPeriod("595251")  // local non-renew
var p = pp.Policy
print("Policy is: " + p.Product + " - Policy Period is: " + pp)

print("-".repeat(100))



pp.Buildings_CG.each(\ b -> {
  print(b.RiskOption_CG )
  print("Harmonized = " + b.Harmonized)
  print("Coverage Level = " + b.DwellingCovLevel_CG)
  
  print(b.DwellingCovLevel_CG.Code)
  print(b.BasedOn.DwellingCovLevel_CG.Code)
  print(b.BasedOn.DwellingOccupancy_CG.Code)
  if(b?.DwellingCovLevel_CG != b?.BasedOn.DwellingCovLevel_CG) {
    print("LLL")
  }
  
  ///////////////////////////////
  
  print(RuralDwellingUtils_CG.grandfatherCovLevel(b, b.DwellingCovLevel_CG))
  
  if (b.BasedOn != null){
    if (b.BasedOn.DwellingCovLevel_CG == b.DwellingCovLevel_CG) {
      print("true")
    }
    print(grandFatherMap[b.BasedOn.DwellingCovLevel_CG] )
    
    if (grandFatherMap[b.BasedOn.DwellingCovLevel_CG] == b.DwellingCovLevel_CG){
      print("true")
      //return (b.BasedOn.DwellingOccupancy_CG == "ownoccsing" or b.BasedOn.DwellingOccupancy_CG == "famocc")
    }
  }
  

})



  

