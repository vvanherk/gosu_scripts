uses gw.api.domain.covterm.OptionCovTerm

//var pp = Job.slicedPeriod("365108") //local
var pp = Job.slicedPeriod("175527") //dev
print(pp)
print("-".repeat(120))


var farmInsuredItems = ca.cooperators.pc.cooputils.OfferingUtil.AllowedInsuredItems(pp.Offering).toList()

farmInsuredItems.each(\ item -> {
//  print(item)
})

print(farmInsuredItems)
  
if(pp.EditEffectiveDate > ScriptParameters.Release46Date) {  
  
  var itemsToRemove = farmInsuredItems.where(\ fItem -> fItem.Code.equalsIgnoreCase("Drone")).toList()
  print(itemsToRemove)
  
  farmInsuredItems.removeWhere(\ dItem -> dItem.Code.equalsIgnoreCase("Drone") )
  print(farmInsuredItems)
}



