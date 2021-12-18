const jwt = require("jsonwebtoken");
const APP_SECRET = "myappsecret";
const UserName = "admin";
const Password ="secret";
const mappings = {
    get: ["/api/orders","/orders"],
    post: ["/api/products", "/products", "/api/categories", "/categories"]
};

function requiresAuthentication(method, url){
    return (mappings[method.toLowerCase()] || []).find(x=> url.startsWith(x)) != undefined;
}

module.exports = function(req, res, next){
    if(req.url.endsWith("/login")&& req.method =="POST"){
        if(req.body && req.body.userName == UserName && req.body.password == Password){
            let token = jwt.sign({data: UserName, expiresIn: "1h"}, APP_SECRET);
            res.json({success:true, token: token});
        }else{
            res.json({success:false});
        }
        res.end();
        return;
    }

    if(requiresAuthentication(req.method, req.url)){
        let token = req.headers["authorization"] || "";
        if(token.startsWith("Bearer<")){
            token = token.substring(7, token.length -1);
            try{
                jwt.verify(token, APP_SECRET);
            }catch(err){}
        }
        res.statusCode = 401;
        res.end();
        return ;
    }
    next();
};