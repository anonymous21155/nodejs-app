const express = require('express');
const { BlobServiceClient, BlockBlobClient,BlobSASPermissions,SASProtocol,generateBlobSASQueryParameters, ContainerSASPermissions, ContainerClient } = require("@azure/storage-blob");
const { DefaultAzureCredential } = require('@azure/identity');
const app = express();
const port = process.env.PORT || 1500;
const containerName = 'testcontainer';
const blobName = 'image.png'
const accountName = 'onedaodevstorageaccount';

app.use(express.json());
app.get('/', (req, res) => {
  res.send('<h1>Hello World</h1>');
});

app.post('/data', (req,res) => {
  console.log('hey');
  console.log(req.body.hello);
  res.json({recieved: 'yes'})
})

async function createBlobSas(blobName) {
  // Get environment variables
  

  // Best practice: create time limits
  const TEN_MINUTES = 10 * 60 * 1000;
  const NOW = new Date();

  // Best practice: set start time a little before current time to 
  // make sure any clock issues are avoided
  const TEN_MINUTES_BEFORE_NOW = new Date(NOW.valueOf() - TEN_MINUTES);
  const TEN_MINUTES_AFTER_NOW = new Date(NOW.valueOf() + TEN_MINUTES);

  // Best practice: use managed identity - DefaultAzureCredential
  const blobServiceClient = new BlobServiceClient(
      'https://onedaodevstorageaccount.blob.core.windows.net',
      new DefaultAzureCredential()
    );

  // Best practice: delegation key is time-limited  
  // When using a user delegation key, container must already exist 
  const userDelegationKey = await blobServiceClient.getUserDelegationKey(
      TEN_MINUTES_BEFORE_NOW, 
      TEN_MINUTES_AFTER_NOW
  );
  const containerPermissionsForAnonymousUser = "l";
  const blobPermissionsForAnonymousUser = "r"
    // Best practice: SAS options are time-limited
    const sasOptions = {
        containerName,                                           
        permissions: BlobSASPermissions.parse(blobPermissionsForAnonymousUser), 
        protocol: SASProtocol.HttpsAndHttp,
        startsOn: TEN_MINUTES_BEFORE_NOW,
        expiresOn: TEN_MINUTES_AFTER_NOW
    };
 
    const sasToken = generateBlobSASQueryParameters(
        sasOptions,
        userDelegationKey,
        accountName 
    ).toString();

    return sasToken;
  
  
}

app.listen(port, async() => {
  console.log(`App listening on http://localhost:${port}`);
  try {
    const token = await createBlobSas(blobName);
    const sasUrl = `https://onedaodevstorageaccount.blob.core.windows.net/${containerName}/${blobName}?${token}`;
    console.log(sasUrl);
  } catch (err) {
    console.error(err);
  }
});




