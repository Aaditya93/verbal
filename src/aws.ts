import { S3 } from "aws-sdk";
import fs from "fs";
import dotenv from "dotenv"
dotenv.config();
const AWS = require('aws-sdk');

const accessKey = process.env.ACCESS_KEY;
const secretAccessKey = process.env.SECRET_ACCESS_KEY
const queueUrl = process.env.QUEUE_URL
const bucketRegion = process.env.BUCKET_REGION
const bucketName = process.env.BUCKET_NAME

if (!bucketName || !bucketRegion || !accessKey || !secretAccessKey || !queueUrl) {
    throw new Error("One or more environment variables are undefined.");
}

const s3 = new S3({
    credentials:{
        accessKeyId: accessKey,
        secretAccessKey: secretAccessKey,

    },
    region: bucketRegion
    
})
const sqs = new AWS.SQS({
    credentials:{
        accessKeyId: accessKey,
        secretAccessKey: secretAccessKey,

    },
    region: bucketRegion

});

export const uploadFile = async (fileName: string, localFilePath: string) => {
    const fileContent = fs.readFileSync(localFilePath);
    const response = await s3.upload({
        Body: fileContent,
        Bucket: bucketName,
        Key: fileName,
    }).promise();
    console.log(response);
}

export const addQueue = async (id: string) => {
    const params = {
        MessageBody: id,
        QueueUrl: queueUrl,
    };
    
    sqs.sendMessage(params, (err: AWS.AWSError, data: AWS.SQS.SendMessageResult) => {
        if (err) {
            console.error('Error:', err);
        } else {
            console.log('Message sent:', data.MessageId);
        }
    });
}

