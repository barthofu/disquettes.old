const { validateDisquette } = require("../../models/Disquette")

module.exports =  (req, res, next) => {



  const aggregatorOpts = [{
    $unwind: "$tags"
},
{
    $group: {
      _id: "$tags",
       tag: { "$first": "$tags" },
        count: { $sum: 1 }
    }
    
},
{ "$sort": { "count": -1 } },
]



    

     validateDisquette.aggregate(aggregatorOpts).exec().then(results=>{

        

        console.log(results)
    
      //  req.tags = [...new Set(results.map(res => res.tags).flatMap(res => res))]
      req.tags = results
        next()

    }).catch(e =>{
        console.log(e);
    })


    
}