/*
 * The MIT License (MIT)
 * Copyright (C) 2023 Huawei Device Co., Ltd.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 */
import URLSearchParams from '@package:pkg_modules/.ohpm/@ohos+axios@2.2.6/pkg_modules/@ohos/axios/src/main/ets/components/lib/platform/ohos/classes/URLSearchParams'
import FormData from '@package:pkg_modules/.ohpm/@ohos+axios@2.2.6/pkg_modules/@ohos/axios/src/main/ets/components/lib/platform/ohos/classes/FormData'

export default {
  isNode: true,
  classes: {
    URLSearchParams,
    FormData,
    Blob: typeof Blob !== 'undefined' && Blob || null
  },
  protocols: [ 'http', 'https', 'file', 'data' ]
};
