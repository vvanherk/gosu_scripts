

var pp = Job.slicedPeriod("175527")  // local 

print(pp)


  print(pp.PeriodStart)
  print(pp.PolicyTerm.RatingEngineContext_CG)
  print(pp.Job.JobType_CG)


print('\n-------------Product Recall-------------------')
    
    if(pp.FLiabLine_CGExists) {
      var covCost = pp.FLiabLine_CG?.covFLPotatoWithdrawalExpense?.FLPotatoWithdrawalExpenseLimitTerm.Value
      print(covCost)
    }

    var cov = pp.FLiabLine_CG.covFLPotatoWithdrawalExpense
    print(cov.PatternCode + " " + cov.DisplayName)
    print(cov.EffectiveDate)

print('\n------------Farm Liability--------------------')


var fLiabLine = pp.FLiabLine_CG
print("FLC(1) Limit is : " + fLiabLine.covFLLiability.FLLiabilityLimitTerm.Value)

var covFLLiability = fLiabLine.covFLLiability
print("FLC(1) Deductible is : " + covFLLiability.FLLiabilityDeductibleTerm.Value) 


print('\n------------Drone--------------------')


var covFLDrone = fLiabLine.covFLDrone
print("Drone Limit is : " +  covFLDrone.FLDroneLimitTerm.Value)

//set drone limit
gw.transaction.Transaction.runWithNewBundle(\ bundle -> {
  bundle.add(covFLDrone)
  covFLDrone.FLDroneLimitTerm.setValueFromString("1000")
  
  }, "su")


print("Drone Limit is : " +  covFLDrone.FLDroneLimitTerm.Value)


print('--------------------------------')


