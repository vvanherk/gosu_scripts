uses gw.api.domain.covterm.OptionCovTerm

//var pp = Job.slicedPeriod("365108") //local
var pp = Job.slicedPeriod("587786") //dev


//pp.PPropLine_CG.PPropBuildings_CG.where(\ ppb ->ppb.Building_CG.BuildingNum == 1).each(\ ppb ->{

pp.PPropLine_CG.PPropBuildings_CG.each(\ ppb ->{

  print("-".repeat(120))
  var b = ppb.Building_CG
  print(b)
  
  var cov = ppb.covBuilding_c
  cov.CovTerms.each(\ ct ->{
    print("  ${ct.PatternCode} " + { ct.Pattern.ModelType, (ct typeis OptionCovTerm)
    })
    if (ct typeis OptionCovTerm) {
      var val = ct.OptionValue
      print("    ${ct.OptionValue} " + { val.OptionCode, val.Value })
    }
  } )
  
  cov.OwningCoverable.CoveragesFromCoverable.each(\ cfc -> {
    print(cfc.Pattern.Code)
  })
} )

