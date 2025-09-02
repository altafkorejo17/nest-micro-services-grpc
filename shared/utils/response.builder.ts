// src/common/build-response.ts
import { Any } from 'google-protobuf/google/protobuf/any_pb';
import * as jspb from 'google-protobuf';
import { Response } from '../protos/common.proto';

export function buildResponse<T extends jspb.Message>(
  message: T,
  success = true,
  msg = 'OK'
): Response {
  const any = new Any();
  any.pack(message.serializeBinary(), message.constructor.name);

  const response = new response();
  response.setSuccess(success);
  response.setMessage(msg);
  response.setData(any);

  return response;
}
