# jest-pg
Create postgres database scheme for each test and delete the database after test using jest globalSetup/globalTeardown.

NOTE: typeorm is used 

# Configuration
This uses TYPEORM configuration from environment variables. You can put it in a .env file or specify TYPEROM_* when running jest 

# Usage
jest.config.js
``` 
...
globalSetup: "jest-pg/src/setupDatabase",
globalTeardown: "jest-pg/src/teardownDatabase",
...
```
