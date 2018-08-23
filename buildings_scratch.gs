uses gw.api.productmodel.CoveragePattern

//var pp=job.slicedPeriod("109735")
//var pp=job.slicedPeriod("160514")
var pp=job.slicedPeriod("167306")

var p = pp.Policy
print("Policy is: " + p.Product + " - Policy Period is: " + pp)

pp.AllCoverages.each(\ cov -> print({cov.PatternCode, cov.PublicID})) 

print("${pp.PrimaryNamedInsured.ContactDenorm typeis Company}")

var fprop = pp.FPropLine_CG
var pprop = pp.PPropLine_CG

var eFprop:entity.FPropLine_CG
var ePprop:entity.PPropLine_CG

var ccc = pp.AllCoverages
var limitPatterns : List<CoveragePattern>

print("------------------------------------")


var fptiv = fprop.TIV
print("FP TIV is " + fptiv)

var pptiv = pprop.TIV
print("PP TIV is " + pptiv)


//var coverage : PPropBuildingCov_CG = 
//     pp.AllCoverages.where(\ c ->  PPropBuildingCov_CG 

for(ppb in pp.PPropLine_CG.PPropBuildings_CG) {
  
  print("---------------")
  var printCov = ppb.covBuilding_c.DisplayName
  print(printCov) 
   
  for ( cov in ccc) {
    limitPatterns = {CoveragePattern.getByCode(cov.PatternCode)}
    
    var covLimit = ppb.getAccumulatedLimits(limitPatterns.toTypedArray())
    if(covLimit > 0)
      print(cov.PatternCode + " :" + covLimit)
  }
      
  var ppbtiv = ppb.TIV
  var ppbc = ppb.covBuilding_c
  var cvTerms = ppbc.CovTerms
  print(cvTerms)

  print("Building TIV is: " + ppbtiv)
  
  var accumulatedLimits = cvTerms.where(\ cterm -> cterm.ModelType =="Limit").sum( \ lmt -> lmt.DerivedNumericTermValue == null? 0 :lmt.DerivedNumericTermValue )  
  print(accumulatedLimits)
  
        if( ppb.covBuilding_c.BuildingSettlement_cTerm.OptionValue.OptionCode == "OptLossSettlementAmend"){
          print("This is the droid you've been looking for")
        }
}

print("------------------------------------")
pp.Buildings_CG.each(\ b -> {
  print(b.RiskOption_CG )
  print("Harmonized = " + b.Harmonized)
  print("Coverage Level = " + b.DwellingCovLevel_CG)
  //if(b.DwellingCovLevel_CG == DwellingCovLevel_CG.TC_FARMHOMEOWNERSCLASSIC
})
print("------------------------------------")
pp.FarmStructures_CG.each(\ f -> {
  print(f.DisplayName )
})


