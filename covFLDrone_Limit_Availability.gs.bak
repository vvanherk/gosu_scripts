//var pp = Job.slicedPeriod("6861230") // dev farm guidewire 2018/01/15 - not null FLiabCovCost_CG - $77

//var pp = Job.slicedPeriod("7018552") // dev farm guidewire mid term - hacked - FLiabCovCost_CG rated

var pp = Job.slicedPeriod("8343439") // dev farm guidewire mid term - null FLiabCovCost_CG

//var pp = Job.slicedPeriod("6338470") // dev farm ratabase - not null FLiabCovCost_CG - '$0'

//var pp = Job.slicedPeriod("103676") // local farm vvh


//var pp = Job.slicedPeriod("168643") // local farm vvh


//var pp = Job.slicedPeriod("107138")  // ratedev 

print(pp)


  print(pp.PeriodStart)
  print(pp.FLiabLine_CG.FLiabCosts_CG.toSet().where(\ c ->  c.Overridable).toSet())
     
  print(pp.PolicyTerm.RatingEngineContext_CG)
  print(pp.Job.JobType_CG)


print('--------------------------------')
    var retVal = false
    
    if(pp.FLiabLine_CGExists) {
      var covCost = pp.FLiabLine_CG?.covFLPotatoWithdrawalExpense?.FLiabCovCost_CG
      print(covCost.Overridable)
      var covCostAmount = pp.FLiabLine_CG?.covFLPotatoWithdrawalExpense?.FLiabCovCost_CG.ActualAmount
      if(covCostAmount <= 0) {
        retVal = true
      }
    }
    print(retVal)

print('--------------------------------')


var fLiabLine = pp.FLiabLine_CG
var covFLLiability = fLiabLine.covFLLiability
print(covFLLiability.FLLiabilityDeductibleTerm.Value) 

var cov = pp.FLiabLine_CG.covFLPotatoWithdrawalExpense
print(cov.PatternCode + " " + cov.DisplayName)
print(cov.EffectiveDate)

//print(cov.FLPotatoWithdrawalExpenseDeductibleTerm)

print("\nCoverage cost " + cov.AllCovCosts.AmountSum)
print(cov.FLiabCovCost_CG.ActualAmount)


print("\n")

cov.CovTerms.each(\ ct ->{
  print("  ${ct.PatternCode} " + { ct.ValueAsString })
})
