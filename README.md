# protolane

this is a demo project for aggrating various functions

setup:
npm install 
npm run build
for (geo ip and virtustotal ) please populate the .env.example file and rename to .env
then you can run any one of the following scripts in any order as many times as you want on any number of instances

    "geoip": "node -r dotenv/config ./dist/services/geoIp.js",
    "ping": "node  ./dist/services/ping.js",
    "reversedns": "node ./dist/services/reversedns.js",
    "whois": "node ./dist/services/whois.js",
    "virustotal": "node -r dotenv/config ./dist/services/virustotal.js ",
    "app": "node -r dotenv/config  ./dist/app.js",
    "monitor":"node ./dist/services/monitor.js",
    "monitortool":"node ./dist/services/monitortool.js",
    
npm run app runs the frontend server on port 9000 by default
a sample request is already in a postman collection in the project
supported features

-geoip
-ping
-reversedns
-whois
-virustotal
-a timout can be added in the env or config
-all services are 100% scalable on as many nodes as needed and as many instances without the need for any setup
-validation of the request
-monitoring  and montoring tool (gui runs through 5000 on the node it is setup on)
-all requests will be caches so non of them should get lost if a microsevice is down

