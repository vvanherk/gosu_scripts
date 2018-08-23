var pp = Job.slicedPeriod("282427")
print(pp)
 
var qs = pp.Policy.Product.getQuestionSetById("DroneQuestionSet")
print(qs)
//print(pp.Job.overrideRequiredQuestions(pp))
 
qs.OrderedQuestions.each(\ q ->{
  print("  ${q.Code} " + { pp.getAnswer(q), q.isQuestionVisible(pp), q.getInputSetMode(pp, \ ->print("onChangeBlock") ) })
}) 
