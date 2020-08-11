# Modify package.json

```
  "dependencies": {
    "@sap/cds": "^3",
    "@sap/cds-mtx": "git://github.com/andrewlunde/cds-mtx.git",
    "@sap/hdi-deploy": "^3",
    "@sap/instance-manager": "^2",
    "passport": "^0.4.1",
    "@sap/xssec": "^2.2.0",
    "express": "^4.17.1",
    "hdb": "^0.17.2"
  },

...

  "scripts": {
    "postinstall": "npm dedupe && node .build.js",
    "xstart": "node ./node_modules/@sap/cds/bin/cds.js serve gen/csn.json",
    "start": "node server.js",
    "watch": "nodemon -w . -i node_modules/**,.git/** -e cds -x npm run build"
  },

  "private": true,
  "cds": {
    "requires": {
      "db": {
        "kind": "hana",
        "model": "gen/csn.json",
        "multiTenant": true,
        "vcap": {
          "label": "managed-hana"
        }
      }
    },
    "uaa": {
      "kind": "xsuaa"
    }
  }

```

# Modify ../xs-security.json

```
  "tenant-mode": "shared",
```
# Modify ../mta.yaml by uncommenting these blocks

```
# CDS-MTX
#   properties:
#      TENANT_HOST_PATTERN: '^(.*).cfapps.us10.hana.ondemand.com'

# CDS-MTX
#    - name: mtxsm-reg
#    - name: mtxsm-mgd

# CAP-MTX Managed HANA (Internal Service Manager)
#  - name: mtxsm-mgd
#    type: org.cloudfoundry.managed-service
#    requires:
#     - name: mtxsm_services_api
#    parameters:
#       service-plan: hdi-shared
#       service: managed-hana
#       service-name: mtxsm_MGD

# CAP-MXT Registration
#  - name: mtxsm-reg
#    type: org.cloudfoundry.managed-service
#    requires:
#     - name: mtxsm-uaa
#    parameters:
#     service: saas-registry
#     service-plan: application
#     service-name: mtxsm_REG
#     config:
#       xsappname: ~{mtxsm-uaa/XSAPPNAME}
#       appName: mtxsm
#       displayName: mtxsm
#       description: 'mtxsm Multitenant App'
#       category: 'mtxsm Category'
#       appUrls:
#          onSubscription: https://mtxsm-srv-${space}.cfapps.us10.hana.ondemand.com/mtx/v1/provisioning/tenant/{tenantId}

```