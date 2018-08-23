var pp = Job.slicedPeriod('177558')
print (pp)
print('--------------------')

pp.FarmStructures_CG.each(\ f -> {
  print(f)
  print(f.FPropBuilding_CG.InflationApplies_CG)
  })
print('--------------------')
  
pp.InsuredItems.each(\ i -> {print(i)})

print('--------------------')

pp.Buildings_CG.each(\ b -> {
  print(b)
  print(b.Type)
  print(b.PPropBuilding_CG.InflationApplies_CG)

  print(b.coverableLocation + ", " + b.RiskOption_CG.DisplayName + ", " + b.DwellingCovLevel_CG.DisplayName)

 
})
 

