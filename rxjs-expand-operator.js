import { interval, of, Observable, from, empty } from 'rxjs';
import { expand, take, map, switchMap, tap } from 'rxjs/operators';

var data$ = from([
  {
  "children": [
    {
      "tagPath": "/facilities/sms-providers/sms-provider",
      "children": [
        {
          "tagPath": "/profiles/profile",
          "children": [
            {
              "tagPath": "/profiles/profile",
              "children": [
                {
                  "tagPath": "/profiles/profile",
                  "children": [],
                  "keyPath": "/profiles/profile{user-management um:user-management-service}",
                  "xPath": "/profiles/profile[id='user-management'][type='um:user-management-service']"
                }
              ],
              "keyPath": "/profiles/profile{oauth-dev as:oauth-service}",
              "xPath": "/profiles/profile[id='oauth-dev'][type='as:oauth-service']"
            }
          ],
          "keyPath": "/profiles/profile{authentication auth:authentication-service}",
          "xPath": "/profiles/profile[id='authentication'][type='auth:authentication-service']"
        },
        {
          "tagPath": "/profiles/profile",
          "children": [
            {
              "tagPath": "/khizer",
               "children":[]
            }
          ],
          "keyPath": "/profiles/profile{saml-idp-authentication auth:authentication-service}",
          "xPath": "/profiles/profile[id='saml-idp-authentication'][type='auth:authentication-service']"
        }
      ],
      "keyPath": "/facilities/sms-providers/sms-provider{restSmsProvider}",
      "xPath": "/facilities/sms-providers/sms-provider[id='restSmsProvider']"
    }
  ]
}
]);

var counter=0;
 data$.
  pipe(
     expand(obj =>{
     counter++;
    return obj.children.length > 0 ? from(obj.children) : empty()
   }),
   tap(tapObj => console.log('tap', tapObj.children)),
   map(obj => ({ depth: counter, children: obj.children }))
 ).
 subscribe(
   (data) =>{
     console.log(data.children[0].tagPath);
   }
 )