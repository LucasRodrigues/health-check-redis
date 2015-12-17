# Health Check Redis

## CI
[![Circle CI](https://circleci.com/gh/LucasRodrigues/health-check-redis.svg?style=svg)](https://circleci.com/gh/LucasRodrigues/health-check-redis)

## Install

```
$ npm install health-check-redis
```

## Usage

```
var healthCheckRedis = require('health-check-redis');

healthCheckRedis.do([
{
  host: '127.0.0.1',
  port: 6379
},
{
  host: 'wrong host',
  port: 6379
}])
 .then(function(result){
    console.log(result); 
    
    /* 
      { 
        health: false,
        success: 1,
        error: 1,
        details: 
          [ 
            { 
              name: '127.0.0.1:6379', 
              health: true, 
              message: '' 
            },
            { 
              name: 'wrong host:6379',
              health: false,
              message: 'Redis connection to wrong host:6379 failed - getaddrinfo ENOTFOUND wrong host wrong host:6379' 
            } 
          ] 
      }
    */
 })
 .catch(function(error){
    console.log(error); 
 });
```