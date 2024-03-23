"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addQueue = exports.uploadFile = void 0;
const aws_sdk_1 = require("aws-sdk");
const fs_1 = __importDefault(require("fs"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const AWS = require('aws-sdk');
const accessKey = process.env.ACCESS_KEY;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;
const queueUrl = process.env.QUEUE_URL;
const bucketRegion = process.env.BUCKET_REGION;
const bucketName = process.env.BUCKET_NAME;
if (!bucketName || !bucketRegion || !accessKey || !secretAccessKey || !queueUrl) {
    throw new Error("One or more environment variables are undefined.");
}
const s3 = new aws_sdk_1.S3({
    credentials: {
        accessKeyId: accessKey,
        secretAccessKey: secretAccessKey,
    },
    region: bucketRegion
});
const sqs = new AWS.SQS({
    credentials: {
        accessKeyId: accessKey,
        secretAccessKey: secretAccessKey,
    },
    region: bucketRegion
});
const uploadFile = (fileName, localFilePath) => __awaiter(void 0, void 0, void 0, function* () {
    const fileContent = fs_1.default.readFileSync(localFilePath);
    const response = yield s3.upload({
        Body: fileContent,
        Bucket: bucketName,
        Key: fileName,
    }).promise();
    console.log(response);
});
exports.uploadFile = uploadFile;
const addQueue = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const params = {
        MessageBody: id,
        QueueUrl: queueUrl,
    };
    sqs.sendMessage(params, (err, data) => {
        if (err) {
            console.error('Error:', err);
        }
        else {
            console.log('Message sent:', data.MessageId);
        }
    });
});
exports.addQueue = addQueue;
