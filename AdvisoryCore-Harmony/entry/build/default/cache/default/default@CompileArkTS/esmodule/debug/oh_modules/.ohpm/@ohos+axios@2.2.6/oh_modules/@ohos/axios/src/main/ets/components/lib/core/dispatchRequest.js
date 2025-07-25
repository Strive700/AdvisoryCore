'use strict';

import transformData from '@package:pkg_modules/.ohpm/@ohos+axios@2.2.6/pkg_modules/@ohos/axios/src/main/ets/components/lib/core/transformData';
import isCancel from '@package:pkg_modules/.ohpm/@ohos+axios@2.2.6/pkg_modules/@ohos/axios/src/main/ets/components/lib/cancel/isCancel';
import defaults from '@package:pkg_modules/.ohpm/@ohos+axios@2.2.6/pkg_modules/@ohos/axios/src/main/ets/components/lib/defaults/index';
import CanceledError from '@package:pkg_modules/.ohpm/@ohos+axios@2.2.6/pkg_modules/@ohos/axios/src/main/ets/components/lib/cancel/CanceledError';
import AxiosHeaders from '@package:pkg_modules/.ohpm/@ohos+axios@2.2.6/pkg_modules/@ohos/axios/src/main/ets/components/lib/core/AxiosHeaders';
import adapters from "@package:pkg_modules/.ohpm/@ohos+axios@2.2.6/pkg_modules/@ohos/axios/src/main/ets/components/lib/adapters/adapters";

/**
 * Throws a `CanceledError` if cancellation has been requested.
 *
 * @param {Object} config The config that is to be used for the request
 *
 * @returns {void}
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }

  if (config.signal && config.signal.aborted) {
    throw new CanceledError(null, config);
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 *
 * @returns {Promise} The Promise to be fulfilled
 */
export default function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  config.headers = AxiosHeaders.from(config.headers);

  // Transform request data
  config.data = transformData.call(
    config,
    config.transformRequest
  );

  if (['post', 'put', 'patch'].indexOf(config.method) !== -1) {
    config.headers.setContentType('application/x-www-form-urlencoded', false);
  }

  const adapter = adapters.getAdapter(config.adapter || defaults.adapter);

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData.call(
      config,
      config.transformResponse,
      response
    );

    response.headers = AxiosHeaders.from(response.headers);

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData.call(
          config,
          config.transformResponse,
          reason.response
        );
        reason.response.headers = AxiosHeaders.from(reason.response.headers);
      }
    }

    return Promise.reject(reason);
  });
}
