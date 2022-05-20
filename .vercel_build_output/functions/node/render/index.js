var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key2, value) => key2 in obj ? __defProp(obj, key2, { enumerable: true, configurable: true, writable: true, value }) : obj[key2] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key2 of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key2) && key2 !== except)
        __defProp(to, key2, { get: () => from[key2], enumerable: !(desc = __getOwnPropDesc(from, key2)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __accessCheck = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet = (obj, member, getter) => {
  __accessCheck(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet = (obj, member, value, setter) => {
  __accessCheck(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};

// node_modules/@sveltejs/kit/dist/chunks/multipart-parser.js
var multipart_parser_exports = {};
__export(multipart_parser_exports, {
  toFormData: () => toFormData
});
function _fileName(headerValue) {
  const m2 = headerValue.match(/\bfilename=("(.*?)"|([^()<>@,;:\\"/[\]?={}\s\t]+))($|;\s)/i);
  if (!m2) {
    return;
  }
  const match = m2[2] || m2[3] || "";
  let filename = match.slice(match.lastIndexOf("\\") + 1);
  filename = filename.replace(/%22/g, '"');
  filename = filename.replace(/&#(\d{4});/g, (m3, code) => {
    return String.fromCharCode(code);
  });
  return filename;
}
async function toFormData(Body2, ct) {
  if (!/multipart/i.test(ct)) {
    throw new TypeError("Failed to fetch");
  }
  const m2 = ct.match(/boundary=(?:"([^"]+)"|([^;]+))/i);
  if (!m2) {
    throw new TypeError("no or bad content-type header, no multipart boundary");
  }
  const parser = new MultipartParser(m2[1] || m2[2]);
  let headerField;
  let headerValue;
  let entryValue;
  let entryName;
  let contentType;
  let filename;
  const entryChunks = [];
  const formData = new FormData();
  const onPartData = (ui8a) => {
    entryValue += decoder.decode(ui8a, { stream: true });
  };
  const appendToFile = (ui8a) => {
    entryChunks.push(ui8a);
  };
  const appendFileToFormData = () => {
    const file = new File(entryChunks, filename, { type: contentType });
    formData.append(entryName, file);
  };
  const appendEntryToFormData = () => {
    formData.append(entryName, entryValue);
  };
  const decoder = new TextDecoder("utf-8");
  decoder.decode();
  parser.onPartBegin = function() {
    parser.onPartData = onPartData;
    parser.onPartEnd = appendEntryToFormData;
    headerField = "";
    headerValue = "";
    entryValue = "";
    entryName = "";
    contentType = "";
    filename = null;
    entryChunks.length = 0;
  };
  parser.onHeaderField = function(ui8a) {
    headerField += decoder.decode(ui8a, { stream: true });
  };
  parser.onHeaderValue = function(ui8a) {
    headerValue += decoder.decode(ui8a, { stream: true });
  };
  parser.onHeaderEnd = function() {
    headerValue += decoder.decode();
    headerField = headerField.toLowerCase();
    if (headerField === "content-disposition") {
      const m3 = headerValue.match(/\bname=("([^"]*)"|([^()<>@,;:\\"/[\]?={}\s\t]+))/i);
      if (m3) {
        entryName = m3[2] || m3[3] || "";
      }
      filename = _fileName(headerValue);
      if (filename) {
        parser.onPartData = appendToFile;
        parser.onPartEnd = appendFileToFormData;
      }
    } else if (headerField === "content-type") {
      contentType = headerValue;
    }
    headerValue = "";
    headerField = "";
  };
  for await (const chunk of Body2) {
    parser.write(chunk);
  }
  parser.end();
  return formData;
}
var import_node_worker_threads, s, S, f, F, LF, CR, SPACE, HYPHEN, COLON, A, Z, lower, noop, MultipartParser;
var init_multipart_parser = __esm({
  "node_modules/@sveltejs/kit/dist/chunks/multipart-parser.js"() {
    import_node_worker_threads = require("worker_threads");
    init_install_fetch();
    globalThis.DOMException || (() => {
      const port = new import_node_worker_threads.MessageChannel().port1;
      const ab = new ArrayBuffer(0);
      try {
        port.postMessage(ab, [ab, ab]);
      } catch (err) {
        return err.constructor;
      }
    })();
    s = 0;
    S = {
      START_BOUNDARY: s++,
      HEADER_FIELD_START: s++,
      HEADER_FIELD: s++,
      HEADER_VALUE_START: s++,
      HEADER_VALUE: s++,
      HEADER_VALUE_ALMOST_DONE: s++,
      HEADERS_ALMOST_DONE: s++,
      PART_DATA_START: s++,
      PART_DATA: s++,
      END: s++
    };
    f = 1;
    F = {
      PART_BOUNDARY: f,
      LAST_BOUNDARY: f *= 2
    };
    LF = 10;
    CR = 13;
    SPACE = 32;
    HYPHEN = 45;
    COLON = 58;
    A = 97;
    Z = 122;
    lower = (c) => c | 32;
    noop = () => {
    };
    MultipartParser = class {
      constructor(boundary) {
        this.index = 0;
        this.flags = 0;
        this.onHeaderEnd = noop;
        this.onHeaderField = noop;
        this.onHeadersEnd = noop;
        this.onHeaderValue = noop;
        this.onPartBegin = noop;
        this.onPartData = noop;
        this.onPartEnd = noop;
        this.boundaryChars = {};
        boundary = "\r\n--" + boundary;
        const ui8a = new Uint8Array(boundary.length);
        for (let i2 = 0; i2 < boundary.length; i2++) {
          ui8a[i2] = boundary.charCodeAt(i2);
          this.boundaryChars[ui8a[i2]] = true;
        }
        this.boundary = ui8a;
        this.lookbehind = new Uint8Array(this.boundary.length + 8);
        this.state = S.START_BOUNDARY;
      }
      write(data) {
        let i2 = 0;
        const length_ = data.length;
        let previousIndex = this.index;
        let { lookbehind, boundary, boundaryChars, index, state, flags } = this;
        const boundaryLength = this.boundary.length;
        const boundaryEnd = boundaryLength - 1;
        const bufferLength = data.length;
        let c;
        let cl;
        const mark = (name) => {
          this[name + "Mark"] = i2;
        };
        const clear = (name) => {
          delete this[name + "Mark"];
        };
        const callback = (callbackSymbol, start, end, ui8a) => {
          if (start === void 0 || start !== end) {
            this[callbackSymbol](ui8a && ui8a.subarray(start, end));
          }
        };
        const dataCallback = (name, clear2) => {
          const markSymbol = name + "Mark";
          if (!(markSymbol in this)) {
            return;
          }
          if (clear2) {
            callback(name, this[markSymbol], i2, data);
            delete this[markSymbol];
          } else {
            callback(name, this[markSymbol], data.length, data);
            this[markSymbol] = 0;
          }
        };
        for (i2 = 0; i2 < length_; i2++) {
          c = data[i2];
          switch (state) {
            case S.START_BOUNDARY:
              if (index === boundary.length - 2) {
                if (c === HYPHEN) {
                  flags |= F.LAST_BOUNDARY;
                } else if (c !== CR) {
                  return;
                }
                index++;
                break;
              } else if (index - 1 === boundary.length - 2) {
                if (flags & F.LAST_BOUNDARY && c === HYPHEN) {
                  state = S.END;
                  flags = 0;
                } else if (!(flags & F.LAST_BOUNDARY) && c === LF) {
                  index = 0;
                  callback("onPartBegin");
                  state = S.HEADER_FIELD_START;
                } else {
                  return;
                }
                break;
              }
              if (c !== boundary[index + 2]) {
                index = -2;
              }
              if (c === boundary[index + 2]) {
                index++;
              }
              break;
            case S.HEADER_FIELD_START:
              state = S.HEADER_FIELD;
              mark("onHeaderField");
              index = 0;
            case S.HEADER_FIELD:
              if (c === CR) {
                clear("onHeaderField");
                state = S.HEADERS_ALMOST_DONE;
                break;
              }
              index++;
              if (c === HYPHEN) {
                break;
              }
              if (c === COLON) {
                if (index === 1) {
                  return;
                }
                dataCallback("onHeaderField", true);
                state = S.HEADER_VALUE_START;
                break;
              }
              cl = lower(c);
              if (cl < A || cl > Z) {
                return;
              }
              break;
            case S.HEADER_VALUE_START:
              if (c === SPACE) {
                break;
              }
              mark("onHeaderValue");
              state = S.HEADER_VALUE;
            case S.HEADER_VALUE:
              if (c === CR) {
                dataCallback("onHeaderValue", true);
                callback("onHeaderEnd");
                state = S.HEADER_VALUE_ALMOST_DONE;
              }
              break;
            case S.HEADER_VALUE_ALMOST_DONE:
              if (c !== LF) {
                return;
              }
              state = S.HEADER_FIELD_START;
              break;
            case S.HEADERS_ALMOST_DONE:
              if (c !== LF) {
                return;
              }
              callback("onHeadersEnd");
              state = S.PART_DATA_START;
              break;
            case S.PART_DATA_START:
              state = S.PART_DATA;
              mark("onPartData");
            case S.PART_DATA:
              previousIndex = index;
              if (index === 0) {
                i2 += boundaryEnd;
                while (i2 < bufferLength && !(data[i2] in boundaryChars)) {
                  i2 += boundaryLength;
                }
                i2 -= boundaryEnd;
                c = data[i2];
              }
              if (index < boundary.length) {
                if (boundary[index] === c) {
                  if (index === 0) {
                    dataCallback("onPartData", true);
                  }
                  index++;
                } else {
                  index = 0;
                }
              } else if (index === boundary.length) {
                index++;
                if (c === CR) {
                  flags |= F.PART_BOUNDARY;
                } else if (c === HYPHEN) {
                  flags |= F.LAST_BOUNDARY;
                } else {
                  index = 0;
                }
              } else if (index - 1 === boundary.length) {
                if (flags & F.PART_BOUNDARY) {
                  index = 0;
                  if (c === LF) {
                    flags &= ~F.PART_BOUNDARY;
                    callback("onPartEnd");
                    callback("onPartBegin");
                    state = S.HEADER_FIELD_START;
                    break;
                  }
                } else if (flags & F.LAST_BOUNDARY) {
                  if (c === HYPHEN) {
                    callback("onPartEnd");
                    state = S.END;
                    flags = 0;
                  } else {
                    index = 0;
                  }
                } else {
                  index = 0;
                }
              }
              if (index > 0) {
                lookbehind[index - 1] = c;
              } else if (previousIndex > 0) {
                const _lookbehind = new Uint8Array(lookbehind.buffer, lookbehind.byteOffset, lookbehind.byteLength);
                callback("onPartData", 0, previousIndex, _lookbehind);
                previousIndex = 0;
                mark("onPartData");
                i2--;
              }
              break;
            case S.END:
              break;
            default:
              throw new Error(`Unexpected state entered: ${state}`);
          }
        }
        dataCallback("onHeaderField");
        dataCallback("onHeaderValue");
        dataCallback("onPartData");
        this.index = index;
        this.state = state;
        this.flags = flags;
      }
      end() {
        if (this.state === S.HEADER_FIELD_START && this.index === 0 || this.state === S.PART_DATA && this.index === this.boundary.length) {
          this.onPartEnd();
        } else if (this.state !== S.END) {
          throw new Error("MultipartParser.end(): stream ended unexpectedly");
        }
      }
    };
  }
});

// node_modules/@sveltejs/kit/dist/install-fetch.js
function dataUriToBuffer(uri) {
  if (!/^data:/i.test(uri)) {
    throw new TypeError('`uri` does not appear to be a Data URI (must begin with "data:")');
  }
  uri = uri.replace(/\r?\n/g, "");
  const firstComma = uri.indexOf(",");
  if (firstComma === -1 || firstComma <= 4) {
    throw new TypeError("malformed data: URI");
  }
  const meta = uri.substring(5, firstComma).split(";");
  let charset = "";
  let base642 = false;
  const type = meta[0] || "text/plain";
  let typeFull = type;
  for (let i2 = 1; i2 < meta.length; i2++) {
    if (meta[i2] === "base64") {
      base642 = true;
    } else {
      typeFull += `;${meta[i2]}`;
      if (meta[i2].indexOf("charset=") === 0) {
        charset = meta[i2].substring(8);
      }
    }
  }
  if (!meta[0] && !charset.length) {
    typeFull += ";charset=US-ASCII";
    charset = "US-ASCII";
  }
  const encoding = base642 ? "base64" : "ascii";
  const data = unescape(uri.substring(firstComma + 1));
  const buffer = Buffer.from(data, encoding);
  buffer.type = type;
  buffer.typeFull = typeFull;
  buffer.charset = charset;
  return buffer;
}
async function* toIterator(parts, clone2 = true) {
  for (const part of parts) {
    if ("stream" in part) {
      yield* part.stream();
    } else if (ArrayBuffer.isView(part)) {
      if (clone2) {
        let position = part.byteOffset;
        const end = part.byteOffset + part.byteLength;
        while (position !== end) {
          const size = Math.min(end - position, POOL_SIZE);
          const chunk = part.buffer.slice(position, position + size);
          position += chunk.byteLength;
          yield new Uint8Array(chunk);
        }
      } else {
        yield part;
      }
    } else {
      let position = 0;
      while (position !== part.size) {
        const chunk = part.slice(position, Math.min(part.size, position + POOL_SIZE));
        const buffer = await chunk.arrayBuffer();
        position += buffer.byteLength;
        yield new Uint8Array(buffer);
      }
    }
  }
}
function formDataToBlob(F2, B = Blob$1) {
  var b = `${r()}${r()}`.replace(/\./g, "").slice(-28).padStart(32, "-"), c = [], p = `--${b}\r
Content-Disposition: form-data; name="`;
  F2.forEach((v, n) => typeof v == "string" ? c.push(p + e(n) + `"\r
\r
${v.replace(/\r(?!\n)|(?<!\r)\n/g, "\r\n")}\r
`) : c.push(p + e(n) + `"; filename="${e(v.name, 1)}"\r
Content-Type: ${v.type || "application/octet-stream"}\r
\r
`, v, "\r\n"));
  c.push(`--${b}--`);
  return new B(c, { type: "multipart/form-data; boundary=" + b });
}
async function consumeBody(data) {
  if (data[INTERNALS$2].disturbed) {
    throw new TypeError(`body used already for: ${data.url}`);
  }
  data[INTERNALS$2].disturbed = true;
  if (data[INTERNALS$2].error) {
    throw data[INTERNALS$2].error;
  }
  const { body } = data;
  if (body === null) {
    return Buffer.alloc(0);
  }
  if (!(body instanceof import_node_stream.default)) {
    return Buffer.alloc(0);
  }
  const accum = [];
  let accumBytes = 0;
  try {
    for await (const chunk of body) {
      if (data.size > 0 && accumBytes + chunk.length > data.size) {
        const error2 = new FetchError(`content size at ${data.url} over limit: ${data.size}`, "max-size");
        body.destroy(error2);
        throw error2;
      }
      accumBytes += chunk.length;
      accum.push(chunk);
    }
  } catch (error2) {
    const error_ = error2 instanceof FetchBaseError ? error2 : new FetchError(`Invalid response body while trying to fetch ${data.url}: ${error2.message}`, "system", error2);
    throw error_;
  }
  if (body.readableEnded === true || body._readableState.ended === true) {
    try {
      if (accum.every((c) => typeof c === "string")) {
        return Buffer.from(accum.join(""));
      }
      return Buffer.concat(accum, accumBytes);
    } catch (error2) {
      throw new FetchError(`Could not create Buffer from response body for ${data.url}: ${error2.message}`, "system", error2);
    }
  } else {
    throw new FetchError(`Premature close of server response while trying to fetch ${data.url}`);
  }
}
function fromRawHeaders(headers2 = []) {
  return new Headers2(headers2.reduce((result, value, index, array) => {
    if (index % 2 === 0) {
      result.push(array.slice(index, index + 2));
    }
    return result;
  }, []).filter(([name, value]) => {
    try {
      validateHeaderName(name);
      validateHeaderValue(name, String(value));
      return true;
    } catch {
      return false;
    }
  }));
}
function stripURLForUseAsAReferrer(url, originOnly = false) {
  if (url == null) {
    return "no-referrer";
  }
  url = new URL(url);
  if (/^(about|blob|data):$/.test(url.protocol)) {
    return "no-referrer";
  }
  url.username = "";
  url.password = "";
  url.hash = "";
  if (originOnly) {
    url.pathname = "";
    url.search = "";
  }
  return url;
}
function validateReferrerPolicy(referrerPolicy) {
  if (!ReferrerPolicy.has(referrerPolicy)) {
    throw new TypeError(`Invalid referrerPolicy: ${referrerPolicy}`);
  }
  return referrerPolicy;
}
function isOriginPotentiallyTrustworthy(url) {
  if (/^(http|ws)s:$/.test(url.protocol)) {
    return true;
  }
  const hostIp = url.host.replace(/(^\[)|(]$)/g, "");
  const hostIPVersion = (0, import_net.isIP)(hostIp);
  if (hostIPVersion === 4 && /^127\./.test(hostIp)) {
    return true;
  }
  if (hostIPVersion === 6 && /^(((0+:){7})|(::(0+:){0,6}))0*1$/.test(hostIp)) {
    return true;
  }
  if (/^(.+\.)*localhost$/.test(url.host)) {
    return false;
  }
  if (url.protocol === "file:") {
    return true;
  }
  return false;
}
function isUrlPotentiallyTrustworthy(url) {
  if (/^about:(blank|srcdoc)$/.test(url)) {
    return true;
  }
  if (url.protocol === "data:") {
    return true;
  }
  if (/^(blob|filesystem):$/.test(url.protocol)) {
    return true;
  }
  return isOriginPotentiallyTrustworthy(url);
}
function determineRequestsReferrer(request, { referrerURLCallback, referrerOriginCallback } = {}) {
  if (request.referrer === "no-referrer" || request.referrerPolicy === "") {
    return null;
  }
  const policy = request.referrerPolicy;
  if (request.referrer === "about:client") {
    return "no-referrer";
  }
  const referrerSource = request.referrer;
  let referrerURL = stripURLForUseAsAReferrer(referrerSource);
  let referrerOrigin = stripURLForUseAsAReferrer(referrerSource, true);
  if (referrerURL.toString().length > 4096) {
    referrerURL = referrerOrigin;
  }
  if (referrerURLCallback) {
    referrerURL = referrerURLCallback(referrerURL);
  }
  if (referrerOriginCallback) {
    referrerOrigin = referrerOriginCallback(referrerOrigin);
  }
  const currentURL = new URL(request.url);
  switch (policy) {
    case "no-referrer":
      return "no-referrer";
    case "origin":
      return referrerOrigin;
    case "unsafe-url":
      return referrerURL;
    case "strict-origin":
      if (isUrlPotentiallyTrustworthy(referrerURL) && !isUrlPotentiallyTrustworthy(currentURL)) {
        return "no-referrer";
      }
      return referrerOrigin.toString();
    case "strict-origin-when-cross-origin":
      if (referrerURL.origin === currentURL.origin) {
        return referrerURL;
      }
      if (isUrlPotentiallyTrustworthy(referrerURL) && !isUrlPotentiallyTrustworthy(currentURL)) {
        return "no-referrer";
      }
      return referrerOrigin;
    case "same-origin":
      if (referrerURL.origin === currentURL.origin) {
        return referrerURL;
      }
      return "no-referrer";
    case "origin-when-cross-origin":
      if (referrerURL.origin === currentURL.origin) {
        return referrerURL;
      }
      return referrerOrigin;
    case "no-referrer-when-downgrade":
      if (isUrlPotentiallyTrustworthy(referrerURL) && !isUrlPotentiallyTrustworthy(currentURL)) {
        return "no-referrer";
      }
      return referrerURL;
    default:
      throw new TypeError(`Invalid referrerPolicy: ${policy}`);
  }
}
function parseReferrerPolicyFromHeader(headers2) {
  const policyTokens = (headers2.get("referrer-policy") || "").split(/[,\s]+/);
  let policy = "";
  for (const token of policyTokens) {
    if (token && ReferrerPolicy.has(token)) {
      policy = token;
    }
  }
  return policy;
}
async function fetch2(url, options_) {
  return new Promise((resolve2, reject) => {
    const request = new Request2(url, options_);
    const { parsedURL, options } = getNodeRequestOptions(request);
    if (!supportedSchemas.has(parsedURL.protocol)) {
      throw new TypeError(`node-fetch cannot load ${url}. URL scheme "${parsedURL.protocol.replace(/:$/, "")}" is not supported.`);
    }
    if (parsedURL.protocol === "data:") {
      const data = dataUriToBuffer(request.url);
      const response2 = new Response2(data, { headers: { "Content-Type": data.typeFull } });
      resolve2(response2);
      return;
    }
    const send = (parsedURL.protocol === "https:" ? import_node_https.default : import_node_http.default).request;
    const { signal } = request;
    let response = null;
    const abort = () => {
      const error2 = new AbortError("The operation was aborted.");
      reject(error2);
      if (request.body && request.body instanceof import_node_stream.default.Readable) {
        request.body.destroy(error2);
      }
      if (!response || !response.body) {
        return;
      }
      response.body.emit("error", error2);
    };
    if (signal && signal.aborted) {
      abort();
      return;
    }
    const abortAndFinalize = () => {
      abort();
      finalize();
    };
    const request_ = send(parsedURL, options);
    if (signal) {
      signal.addEventListener("abort", abortAndFinalize);
    }
    const finalize = () => {
      request_.abort();
      if (signal) {
        signal.removeEventListener("abort", abortAndFinalize);
      }
    };
    request_.on("error", (error2) => {
      reject(new FetchError(`request to ${request.url} failed, reason: ${error2.message}`, "system", error2));
      finalize();
    });
    fixResponseChunkedTransferBadEnding(request_, (error2) => {
      response.body.destroy(error2);
    });
    if (process.version < "v14") {
      request_.on("socket", (s3) => {
        let endedWithEventsCount;
        s3.prependListener("end", () => {
          endedWithEventsCount = s3._eventsCount;
        });
        s3.prependListener("close", (hadError) => {
          if (response && endedWithEventsCount < s3._eventsCount && !hadError) {
            const error2 = new Error("Premature close");
            error2.code = "ERR_STREAM_PREMATURE_CLOSE";
            response.body.emit("error", error2);
          }
        });
      });
    }
    request_.on("response", (response_) => {
      request_.setTimeout(0);
      const headers2 = fromRawHeaders(response_.rawHeaders);
      if (isRedirect(response_.statusCode)) {
        const location = headers2.get("Location");
        const locationURL = location === null ? null : new URL(location, request.url);
        switch (request.redirect) {
          case "error":
            reject(new FetchError(`uri requested responds with a redirect, redirect mode is set to error: ${request.url}`, "no-redirect"));
            finalize();
            return;
          case "manual":
            if (locationURL !== null) {
              headers2.set("Location", locationURL);
            }
            break;
          case "follow": {
            if (locationURL === null) {
              break;
            }
            if (request.counter >= request.follow) {
              reject(new FetchError(`maximum redirect reached at: ${request.url}`, "max-redirect"));
              finalize();
              return;
            }
            const requestOptions = {
              headers: new Headers2(request.headers),
              follow: request.follow,
              counter: request.counter + 1,
              agent: request.agent,
              compress: request.compress,
              method: request.method,
              body: clone(request),
              signal: request.signal,
              size: request.size,
              referrer: request.referrer,
              referrerPolicy: request.referrerPolicy
            };
            if (response_.statusCode !== 303 && request.body && options_.body instanceof import_node_stream.default.Readable) {
              reject(new FetchError("Cannot follow redirect with body being a readable stream", "unsupported-redirect"));
              finalize();
              return;
            }
            if (response_.statusCode === 303 || (response_.statusCode === 301 || response_.statusCode === 302) && request.method === "POST") {
              requestOptions.method = "GET";
              requestOptions.body = void 0;
              requestOptions.headers.delete("content-length");
            }
            const responseReferrerPolicy = parseReferrerPolicyFromHeader(headers2);
            if (responseReferrerPolicy) {
              requestOptions.referrerPolicy = responseReferrerPolicy;
            }
            resolve2(fetch2(new Request2(locationURL, requestOptions)));
            finalize();
            return;
          }
          default:
            return reject(new TypeError(`Redirect option '${request.redirect}' is not a valid value of RequestRedirect`));
        }
      }
      if (signal) {
        response_.once("end", () => {
          signal.removeEventListener("abort", abortAndFinalize);
        });
      }
      let body = (0, import_node_stream.pipeline)(response_, new import_node_stream.PassThrough(), reject);
      if (process.version < "v12.10") {
        response_.on("aborted", abortAndFinalize);
      }
      const responseOptions = {
        url: request.url,
        status: response_.statusCode,
        statusText: response_.statusMessage,
        headers: headers2,
        size: request.size,
        counter: request.counter,
        highWaterMark: request.highWaterMark
      };
      const codings = headers2.get("Content-Encoding");
      if (!request.compress || request.method === "HEAD" || codings === null || response_.statusCode === 204 || response_.statusCode === 304) {
        response = new Response2(body, responseOptions);
        resolve2(response);
        return;
      }
      const zlibOptions = {
        flush: import_node_zlib.default.Z_SYNC_FLUSH,
        finishFlush: import_node_zlib.default.Z_SYNC_FLUSH
      };
      if (codings === "gzip" || codings === "x-gzip") {
        body = (0, import_node_stream.pipeline)(body, import_node_zlib.default.createGunzip(zlibOptions), reject);
        response = new Response2(body, responseOptions);
        resolve2(response);
        return;
      }
      if (codings === "deflate" || codings === "x-deflate") {
        const raw = (0, import_node_stream.pipeline)(response_, new import_node_stream.PassThrough(), reject);
        raw.once("data", (chunk) => {
          body = (chunk[0] & 15) === 8 ? (0, import_node_stream.pipeline)(body, import_node_zlib.default.createInflate(), reject) : (0, import_node_stream.pipeline)(body, import_node_zlib.default.createInflateRaw(), reject);
          response = new Response2(body, responseOptions);
          resolve2(response);
        });
        return;
      }
      if (codings === "br") {
        body = (0, import_node_stream.pipeline)(body, import_node_zlib.default.createBrotliDecompress(), reject);
        response = new Response2(body, responseOptions);
        resolve2(response);
        return;
      }
      response = new Response2(body, responseOptions);
      resolve2(response);
    });
    writeToStream(request_, request);
  });
}
function fixResponseChunkedTransferBadEnding(request, errorCallback) {
  const LAST_CHUNK = Buffer.from("0\r\n\r\n");
  let isChunkedTransfer = false;
  let properLastChunkReceived = false;
  let previousChunk;
  request.on("response", (response) => {
    const { headers: headers2 } = response;
    isChunkedTransfer = headers2["transfer-encoding"] === "chunked" && !headers2["content-length"];
  });
  request.on("socket", (socket) => {
    const onSocketClose = () => {
      if (isChunkedTransfer && !properLastChunkReceived) {
        const error2 = new Error("Premature close");
        error2.code = "ERR_STREAM_PREMATURE_CLOSE";
        errorCallback(error2);
      }
    };
    socket.prependListener("close", onSocketClose);
    request.on("abort", () => {
      socket.removeListener("close", onSocketClose);
    });
    socket.on("data", (buf) => {
      properLastChunkReceived = Buffer.compare(buf.slice(-5), LAST_CHUNK) === 0;
      if (!properLastChunkReceived && previousChunk) {
        properLastChunkReceived = Buffer.compare(previousChunk.slice(-3), LAST_CHUNK.slice(0, 3)) === 0 && Buffer.compare(buf.slice(-2), LAST_CHUNK.slice(3)) === 0;
      }
      previousChunk = buf;
    });
  });
}
function installFetch() {
  Object.defineProperties(globalThis, {
    fetch: {
      enumerable: true,
      configurable: true,
      value: fetch2
    },
    Response: {
      enumerable: true,
      configurable: true,
      value: Response2
    },
    Request: {
      enumerable: true,
      configurable: true,
      value: Request2
    },
    Headers: {
      enumerable: true,
      configurable: true,
      value: Headers2
    }
  });
}
var import_node_http, import_node_https, import_node_zlib, import_node_stream, import_node_util, import_node_url, import_net, commonjsGlobal, ponyfill_es2018, POOL_SIZE$1, POOL_SIZE, _parts, _type, _size, _a, _Blob, Blob, Blob$1, _lastModified, _name, _a2, _File, File, t, i, h, r, m, f2, e, x, _d, _a3, FormData, FetchBaseError, FetchError, NAME, isURLSearchParameters, isBlob, isAbortSignal, INTERNALS$2, Body, clone, getNonSpecFormDataBoundary, extractContentType, getTotalBytes, writeToStream, validateHeaderName, validateHeaderValue, Headers2, redirectStatus, isRedirect, INTERNALS$1, Response2, getSearch, ReferrerPolicy, DEFAULT_REFERRER_POLICY, INTERNALS, isRequest, Request2, getNodeRequestOptions, AbortError, supportedSchemas;
var init_install_fetch = __esm({
  "node_modules/@sveltejs/kit/dist/install-fetch.js"() {
    import_node_http = __toESM(require("http"), 1);
    import_node_https = __toESM(require("https"), 1);
    import_node_zlib = __toESM(require("zlib"), 1);
    import_node_stream = __toESM(require("stream"), 1);
    import_node_util = require("util");
    import_node_url = require("url");
    import_net = require("net");
    commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
    ponyfill_es2018 = { exports: {} };
    (function(module2, exports) {
      (function(global2, factory) {
        factory(exports);
      })(commonjsGlobal, function(exports2) {
        const SymbolPolyfill = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? Symbol : (description) => `Symbol(${description})`;
        function noop3() {
          return void 0;
        }
        function getGlobals() {
          if (typeof self !== "undefined") {
            return self;
          } else if (typeof window !== "undefined") {
            return window;
          } else if (typeof commonjsGlobal !== "undefined") {
            return commonjsGlobal;
          }
          return void 0;
        }
        const globals = getGlobals();
        function typeIsObject(x2) {
          return typeof x2 === "object" && x2 !== null || typeof x2 === "function";
        }
        const rethrowAssertionErrorRejection = noop3;
        const originalPromise = Promise;
        const originalPromiseThen = Promise.prototype.then;
        const originalPromiseResolve = Promise.resolve.bind(originalPromise);
        const originalPromiseReject = Promise.reject.bind(originalPromise);
        function newPromise(executor) {
          return new originalPromise(executor);
        }
        function promiseResolvedWith(value) {
          return originalPromiseResolve(value);
        }
        function promiseRejectedWith(reason) {
          return originalPromiseReject(reason);
        }
        function PerformPromiseThen(promise, onFulfilled, onRejected) {
          return originalPromiseThen.call(promise, onFulfilled, onRejected);
        }
        function uponPromise(promise, onFulfilled, onRejected) {
          PerformPromiseThen(PerformPromiseThen(promise, onFulfilled, onRejected), void 0, rethrowAssertionErrorRejection);
        }
        function uponFulfillment(promise, onFulfilled) {
          uponPromise(promise, onFulfilled);
        }
        function uponRejection(promise, onRejected) {
          uponPromise(promise, void 0, onRejected);
        }
        function transformPromiseWith(promise, fulfillmentHandler, rejectionHandler) {
          return PerformPromiseThen(promise, fulfillmentHandler, rejectionHandler);
        }
        function setPromiseIsHandledToTrue(promise) {
          PerformPromiseThen(promise, void 0, rethrowAssertionErrorRejection);
        }
        const queueMicrotask = (() => {
          const globalQueueMicrotask = globals && globals.queueMicrotask;
          if (typeof globalQueueMicrotask === "function") {
            return globalQueueMicrotask;
          }
          const resolvedPromise = promiseResolvedWith(void 0);
          return (fn) => PerformPromiseThen(resolvedPromise, fn);
        })();
        function reflectCall(F2, V, args) {
          if (typeof F2 !== "function") {
            throw new TypeError("Argument is not a function");
          }
          return Function.prototype.apply.call(F2, V, args);
        }
        function promiseCall(F2, V, args) {
          try {
            return promiseResolvedWith(reflectCall(F2, V, args));
          } catch (value) {
            return promiseRejectedWith(value);
          }
        }
        const QUEUE_MAX_ARRAY_SIZE = 16384;
        class SimpleQueue {
          constructor() {
            this._cursor = 0;
            this._size = 0;
            this._front = {
              _elements: [],
              _next: void 0
            };
            this._back = this._front;
            this._cursor = 0;
            this._size = 0;
          }
          get length() {
            return this._size;
          }
          push(element) {
            const oldBack = this._back;
            let newBack = oldBack;
            if (oldBack._elements.length === QUEUE_MAX_ARRAY_SIZE - 1) {
              newBack = {
                _elements: [],
                _next: void 0
              };
            }
            oldBack._elements.push(element);
            if (newBack !== oldBack) {
              this._back = newBack;
              oldBack._next = newBack;
            }
            ++this._size;
          }
          shift() {
            const oldFront = this._front;
            let newFront = oldFront;
            const oldCursor = this._cursor;
            let newCursor = oldCursor + 1;
            const elements = oldFront._elements;
            const element = elements[oldCursor];
            if (newCursor === QUEUE_MAX_ARRAY_SIZE) {
              newFront = oldFront._next;
              newCursor = 0;
            }
            --this._size;
            this._cursor = newCursor;
            if (oldFront !== newFront) {
              this._front = newFront;
            }
            elements[oldCursor] = void 0;
            return element;
          }
          forEach(callback) {
            let i2 = this._cursor;
            let node = this._front;
            let elements = node._elements;
            while (i2 !== elements.length || node._next !== void 0) {
              if (i2 === elements.length) {
                node = node._next;
                elements = node._elements;
                i2 = 0;
                if (elements.length === 0) {
                  break;
                }
              }
              callback(elements[i2]);
              ++i2;
            }
          }
          peek() {
            const front = this._front;
            const cursor = this._cursor;
            return front._elements[cursor];
          }
        }
        function ReadableStreamReaderGenericInitialize(reader, stream) {
          reader._ownerReadableStream = stream;
          stream._reader = reader;
          if (stream._state === "readable") {
            defaultReaderClosedPromiseInitialize(reader);
          } else if (stream._state === "closed") {
            defaultReaderClosedPromiseInitializeAsResolved(reader);
          } else {
            defaultReaderClosedPromiseInitializeAsRejected(reader, stream._storedError);
          }
        }
        function ReadableStreamReaderGenericCancel(reader, reason) {
          const stream = reader._ownerReadableStream;
          return ReadableStreamCancel(stream, reason);
        }
        function ReadableStreamReaderGenericRelease(reader) {
          if (reader._ownerReadableStream._state === "readable") {
            defaultReaderClosedPromiseReject(reader, new TypeError(`Reader was released and can no longer be used to monitor the stream's closedness`));
          } else {
            defaultReaderClosedPromiseResetToRejected(reader, new TypeError(`Reader was released and can no longer be used to monitor the stream's closedness`));
          }
          reader._ownerReadableStream._reader = void 0;
          reader._ownerReadableStream = void 0;
        }
        function readerLockException(name) {
          return new TypeError("Cannot " + name + " a stream using a released reader");
        }
        function defaultReaderClosedPromiseInitialize(reader) {
          reader._closedPromise = newPromise((resolve2, reject) => {
            reader._closedPromise_resolve = resolve2;
            reader._closedPromise_reject = reject;
          });
        }
        function defaultReaderClosedPromiseInitializeAsRejected(reader, reason) {
          defaultReaderClosedPromiseInitialize(reader);
          defaultReaderClosedPromiseReject(reader, reason);
        }
        function defaultReaderClosedPromiseInitializeAsResolved(reader) {
          defaultReaderClosedPromiseInitialize(reader);
          defaultReaderClosedPromiseResolve(reader);
        }
        function defaultReaderClosedPromiseReject(reader, reason) {
          if (reader._closedPromise_reject === void 0) {
            return;
          }
          setPromiseIsHandledToTrue(reader._closedPromise);
          reader._closedPromise_reject(reason);
          reader._closedPromise_resolve = void 0;
          reader._closedPromise_reject = void 0;
        }
        function defaultReaderClosedPromiseResetToRejected(reader, reason) {
          defaultReaderClosedPromiseInitializeAsRejected(reader, reason);
        }
        function defaultReaderClosedPromiseResolve(reader) {
          if (reader._closedPromise_resolve === void 0) {
            return;
          }
          reader._closedPromise_resolve(void 0);
          reader._closedPromise_resolve = void 0;
          reader._closedPromise_reject = void 0;
        }
        const AbortSteps = SymbolPolyfill("[[AbortSteps]]");
        const ErrorSteps = SymbolPolyfill("[[ErrorSteps]]");
        const CancelSteps = SymbolPolyfill("[[CancelSteps]]");
        const PullSteps = SymbolPolyfill("[[PullSteps]]");
        const NumberIsFinite = Number.isFinite || function(x2) {
          return typeof x2 === "number" && isFinite(x2);
        };
        const MathTrunc = Math.trunc || function(v) {
          return v < 0 ? Math.ceil(v) : Math.floor(v);
        };
        function isDictionary(x2) {
          return typeof x2 === "object" || typeof x2 === "function";
        }
        function assertDictionary(obj, context) {
          if (obj !== void 0 && !isDictionary(obj)) {
            throw new TypeError(`${context} is not an object.`);
          }
        }
        function assertFunction(x2, context) {
          if (typeof x2 !== "function") {
            throw new TypeError(`${context} is not a function.`);
          }
        }
        function isObject(x2) {
          return typeof x2 === "object" && x2 !== null || typeof x2 === "function";
        }
        function assertObject(x2, context) {
          if (!isObject(x2)) {
            throw new TypeError(`${context} is not an object.`);
          }
        }
        function assertRequiredArgument(x2, position, context) {
          if (x2 === void 0) {
            throw new TypeError(`Parameter ${position} is required in '${context}'.`);
          }
        }
        function assertRequiredField(x2, field, context) {
          if (x2 === void 0) {
            throw new TypeError(`${field} is required in '${context}'.`);
          }
        }
        function convertUnrestrictedDouble(value) {
          return Number(value);
        }
        function censorNegativeZero(x2) {
          return x2 === 0 ? 0 : x2;
        }
        function integerPart(x2) {
          return censorNegativeZero(MathTrunc(x2));
        }
        function convertUnsignedLongLongWithEnforceRange(value, context) {
          const lowerBound = 0;
          const upperBound = Number.MAX_SAFE_INTEGER;
          let x2 = Number(value);
          x2 = censorNegativeZero(x2);
          if (!NumberIsFinite(x2)) {
            throw new TypeError(`${context} is not a finite number`);
          }
          x2 = integerPart(x2);
          if (x2 < lowerBound || x2 > upperBound) {
            throw new TypeError(`${context} is outside the accepted range of ${lowerBound} to ${upperBound}, inclusive`);
          }
          if (!NumberIsFinite(x2) || x2 === 0) {
            return 0;
          }
          return x2;
        }
        function assertReadableStream(x2, context) {
          if (!IsReadableStream(x2)) {
            throw new TypeError(`${context} is not a ReadableStream.`);
          }
        }
        function AcquireReadableStreamDefaultReader(stream) {
          return new ReadableStreamDefaultReader(stream);
        }
        function ReadableStreamAddReadRequest(stream, readRequest) {
          stream._reader._readRequests.push(readRequest);
        }
        function ReadableStreamFulfillReadRequest(stream, chunk, done) {
          const reader = stream._reader;
          const readRequest = reader._readRequests.shift();
          if (done) {
            readRequest._closeSteps();
          } else {
            readRequest._chunkSteps(chunk);
          }
        }
        function ReadableStreamGetNumReadRequests(stream) {
          return stream._reader._readRequests.length;
        }
        function ReadableStreamHasDefaultReader(stream) {
          const reader = stream._reader;
          if (reader === void 0) {
            return false;
          }
          if (!IsReadableStreamDefaultReader(reader)) {
            return false;
          }
          return true;
        }
        class ReadableStreamDefaultReader {
          constructor(stream) {
            assertRequiredArgument(stream, 1, "ReadableStreamDefaultReader");
            assertReadableStream(stream, "First parameter");
            if (IsReadableStreamLocked(stream)) {
              throw new TypeError("This stream has already been locked for exclusive reading by another reader");
            }
            ReadableStreamReaderGenericInitialize(this, stream);
            this._readRequests = new SimpleQueue();
          }
          get closed() {
            if (!IsReadableStreamDefaultReader(this)) {
              return promiseRejectedWith(defaultReaderBrandCheckException("closed"));
            }
            return this._closedPromise;
          }
          cancel(reason = void 0) {
            if (!IsReadableStreamDefaultReader(this)) {
              return promiseRejectedWith(defaultReaderBrandCheckException("cancel"));
            }
            if (this._ownerReadableStream === void 0) {
              return promiseRejectedWith(readerLockException("cancel"));
            }
            return ReadableStreamReaderGenericCancel(this, reason);
          }
          read() {
            if (!IsReadableStreamDefaultReader(this)) {
              return promiseRejectedWith(defaultReaderBrandCheckException("read"));
            }
            if (this._ownerReadableStream === void 0) {
              return promiseRejectedWith(readerLockException("read from"));
            }
            let resolvePromise;
            let rejectPromise;
            const promise = newPromise((resolve2, reject) => {
              resolvePromise = resolve2;
              rejectPromise = reject;
            });
            const readRequest = {
              _chunkSteps: (chunk) => resolvePromise({ value: chunk, done: false }),
              _closeSteps: () => resolvePromise({ value: void 0, done: true }),
              _errorSteps: (e2) => rejectPromise(e2)
            };
            ReadableStreamDefaultReaderRead(this, readRequest);
            return promise;
          }
          releaseLock() {
            if (!IsReadableStreamDefaultReader(this)) {
              throw defaultReaderBrandCheckException("releaseLock");
            }
            if (this._ownerReadableStream === void 0) {
              return;
            }
            if (this._readRequests.length > 0) {
              throw new TypeError("Tried to release a reader lock when that reader has pending read() calls un-settled");
            }
            ReadableStreamReaderGenericRelease(this);
          }
        }
        Object.defineProperties(ReadableStreamDefaultReader.prototype, {
          cancel: { enumerable: true },
          read: { enumerable: true },
          releaseLock: { enumerable: true },
          closed: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(ReadableStreamDefaultReader.prototype, SymbolPolyfill.toStringTag, {
            value: "ReadableStreamDefaultReader",
            configurable: true
          });
        }
        function IsReadableStreamDefaultReader(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_readRequests")) {
            return false;
          }
          return x2 instanceof ReadableStreamDefaultReader;
        }
        function ReadableStreamDefaultReaderRead(reader, readRequest) {
          const stream = reader._ownerReadableStream;
          stream._disturbed = true;
          if (stream._state === "closed") {
            readRequest._closeSteps();
          } else if (stream._state === "errored") {
            readRequest._errorSteps(stream._storedError);
          } else {
            stream._readableStreamController[PullSteps](readRequest);
          }
        }
        function defaultReaderBrandCheckException(name) {
          return new TypeError(`ReadableStreamDefaultReader.prototype.${name} can only be used on a ReadableStreamDefaultReader`);
        }
        const AsyncIteratorPrototype = Object.getPrototypeOf(Object.getPrototypeOf(async function* () {
        }).prototype);
        class ReadableStreamAsyncIteratorImpl {
          constructor(reader, preventCancel) {
            this._ongoingPromise = void 0;
            this._isFinished = false;
            this._reader = reader;
            this._preventCancel = preventCancel;
          }
          next() {
            const nextSteps = () => this._nextSteps();
            this._ongoingPromise = this._ongoingPromise ? transformPromiseWith(this._ongoingPromise, nextSteps, nextSteps) : nextSteps();
            return this._ongoingPromise;
          }
          return(value) {
            const returnSteps = () => this._returnSteps(value);
            return this._ongoingPromise ? transformPromiseWith(this._ongoingPromise, returnSteps, returnSteps) : returnSteps();
          }
          _nextSteps() {
            if (this._isFinished) {
              return Promise.resolve({ value: void 0, done: true });
            }
            const reader = this._reader;
            if (reader._ownerReadableStream === void 0) {
              return promiseRejectedWith(readerLockException("iterate"));
            }
            let resolvePromise;
            let rejectPromise;
            const promise = newPromise((resolve2, reject) => {
              resolvePromise = resolve2;
              rejectPromise = reject;
            });
            const readRequest = {
              _chunkSteps: (chunk) => {
                this._ongoingPromise = void 0;
                queueMicrotask(() => resolvePromise({ value: chunk, done: false }));
              },
              _closeSteps: () => {
                this._ongoingPromise = void 0;
                this._isFinished = true;
                ReadableStreamReaderGenericRelease(reader);
                resolvePromise({ value: void 0, done: true });
              },
              _errorSteps: (reason) => {
                this._ongoingPromise = void 0;
                this._isFinished = true;
                ReadableStreamReaderGenericRelease(reader);
                rejectPromise(reason);
              }
            };
            ReadableStreamDefaultReaderRead(reader, readRequest);
            return promise;
          }
          _returnSteps(value) {
            if (this._isFinished) {
              return Promise.resolve({ value, done: true });
            }
            this._isFinished = true;
            const reader = this._reader;
            if (reader._ownerReadableStream === void 0) {
              return promiseRejectedWith(readerLockException("finish iterating"));
            }
            if (!this._preventCancel) {
              const result = ReadableStreamReaderGenericCancel(reader, value);
              ReadableStreamReaderGenericRelease(reader);
              return transformPromiseWith(result, () => ({ value, done: true }));
            }
            ReadableStreamReaderGenericRelease(reader);
            return promiseResolvedWith({ value, done: true });
          }
        }
        const ReadableStreamAsyncIteratorPrototype = {
          next() {
            if (!IsReadableStreamAsyncIterator(this)) {
              return promiseRejectedWith(streamAsyncIteratorBrandCheckException("next"));
            }
            return this._asyncIteratorImpl.next();
          },
          return(value) {
            if (!IsReadableStreamAsyncIterator(this)) {
              return promiseRejectedWith(streamAsyncIteratorBrandCheckException("return"));
            }
            return this._asyncIteratorImpl.return(value);
          }
        };
        if (AsyncIteratorPrototype !== void 0) {
          Object.setPrototypeOf(ReadableStreamAsyncIteratorPrototype, AsyncIteratorPrototype);
        }
        function AcquireReadableStreamAsyncIterator(stream, preventCancel) {
          const reader = AcquireReadableStreamDefaultReader(stream);
          const impl = new ReadableStreamAsyncIteratorImpl(reader, preventCancel);
          const iterator = Object.create(ReadableStreamAsyncIteratorPrototype);
          iterator._asyncIteratorImpl = impl;
          return iterator;
        }
        function IsReadableStreamAsyncIterator(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_asyncIteratorImpl")) {
            return false;
          }
          try {
            return x2._asyncIteratorImpl instanceof ReadableStreamAsyncIteratorImpl;
          } catch (_a4) {
            return false;
          }
        }
        function streamAsyncIteratorBrandCheckException(name) {
          return new TypeError(`ReadableStreamAsyncIterator.${name} can only be used on a ReadableSteamAsyncIterator`);
        }
        const NumberIsNaN = Number.isNaN || function(x2) {
          return x2 !== x2;
        };
        function CreateArrayFromList(elements) {
          return elements.slice();
        }
        function CopyDataBlockBytes(dest, destOffset, src, srcOffset, n) {
          new Uint8Array(dest).set(new Uint8Array(src, srcOffset, n), destOffset);
        }
        function TransferArrayBuffer(O) {
          return O;
        }
        function IsDetachedBuffer(O) {
          return false;
        }
        function ArrayBufferSlice(buffer, begin, end) {
          if (buffer.slice) {
            return buffer.slice(begin, end);
          }
          const length = end - begin;
          const slice = new ArrayBuffer(length);
          CopyDataBlockBytes(slice, 0, buffer, begin, length);
          return slice;
        }
        function IsNonNegativeNumber(v) {
          if (typeof v !== "number") {
            return false;
          }
          if (NumberIsNaN(v)) {
            return false;
          }
          if (v < 0) {
            return false;
          }
          return true;
        }
        function CloneAsUint8Array(O) {
          const buffer = ArrayBufferSlice(O.buffer, O.byteOffset, O.byteOffset + O.byteLength);
          return new Uint8Array(buffer);
        }
        function DequeueValue(container) {
          const pair = container._queue.shift();
          container._queueTotalSize -= pair.size;
          if (container._queueTotalSize < 0) {
            container._queueTotalSize = 0;
          }
          return pair.value;
        }
        function EnqueueValueWithSize(container, value, size) {
          if (!IsNonNegativeNumber(size) || size === Infinity) {
            throw new RangeError("Size must be a finite, non-NaN, non-negative number.");
          }
          container._queue.push({ value, size });
          container._queueTotalSize += size;
        }
        function PeekQueueValue(container) {
          const pair = container._queue.peek();
          return pair.value;
        }
        function ResetQueue(container) {
          container._queue = new SimpleQueue();
          container._queueTotalSize = 0;
        }
        class ReadableStreamBYOBRequest {
          constructor() {
            throw new TypeError("Illegal constructor");
          }
          get view() {
            if (!IsReadableStreamBYOBRequest(this)) {
              throw byobRequestBrandCheckException("view");
            }
            return this._view;
          }
          respond(bytesWritten) {
            if (!IsReadableStreamBYOBRequest(this)) {
              throw byobRequestBrandCheckException("respond");
            }
            assertRequiredArgument(bytesWritten, 1, "respond");
            bytesWritten = convertUnsignedLongLongWithEnforceRange(bytesWritten, "First parameter");
            if (this._associatedReadableByteStreamController === void 0) {
              throw new TypeError("This BYOB request has been invalidated");
            }
            if (IsDetachedBuffer(this._view.buffer))
              ;
            ReadableByteStreamControllerRespond(this._associatedReadableByteStreamController, bytesWritten);
          }
          respondWithNewView(view) {
            if (!IsReadableStreamBYOBRequest(this)) {
              throw byobRequestBrandCheckException("respondWithNewView");
            }
            assertRequiredArgument(view, 1, "respondWithNewView");
            if (!ArrayBuffer.isView(view)) {
              throw new TypeError("You can only respond with array buffer views");
            }
            if (this._associatedReadableByteStreamController === void 0) {
              throw new TypeError("This BYOB request has been invalidated");
            }
            if (IsDetachedBuffer(view.buffer))
              ;
            ReadableByteStreamControllerRespondWithNewView(this._associatedReadableByteStreamController, view);
          }
        }
        Object.defineProperties(ReadableStreamBYOBRequest.prototype, {
          respond: { enumerable: true },
          respondWithNewView: { enumerable: true },
          view: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(ReadableStreamBYOBRequest.prototype, SymbolPolyfill.toStringTag, {
            value: "ReadableStreamBYOBRequest",
            configurable: true
          });
        }
        class ReadableByteStreamController {
          constructor() {
            throw new TypeError("Illegal constructor");
          }
          get byobRequest() {
            if (!IsReadableByteStreamController(this)) {
              throw byteStreamControllerBrandCheckException("byobRequest");
            }
            return ReadableByteStreamControllerGetBYOBRequest(this);
          }
          get desiredSize() {
            if (!IsReadableByteStreamController(this)) {
              throw byteStreamControllerBrandCheckException("desiredSize");
            }
            return ReadableByteStreamControllerGetDesiredSize(this);
          }
          close() {
            if (!IsReadableByteStreamController(this)) {
              throw byteStreamControllerBrandCheckException("close");
            }
            if (this._closeRequested) {
              throw new TypeError("The stream has already been closed; do not close it again!");
            }
            const state = this._controlledReadableByteStream._state;
            if (state !== "readable") {
              throw new TypeError(`The stream (in ${state} state) is not in the readable state and cannot be closed`);
            }
            ReadableByteStreamControllerClose(this);
          }
          enqueue(chunk) {
            if (!IsReadableByteStreamController(this)) {
              throw byteStreamControllerBrandCheckException("enqueue");
            }
            assertRequiredArgument(chunk, 1, "enqueue");
            if (!ArrayBuffer.isView(chunk)) {
              throw new TypeError("chunk must be an array buffer view");
            }
            if (chunk.byteLength === 0) {
              throw new TypeError("chunk must have non-zero byteLength");
            }
            if (chunk.buffer.byteLength === 0) {
              throw new TypeError(`chunk's buffer must have non-zero byteLength`);
            }
            if (this._closeRequested) {
              throw new TypeError("stream is closed or draining");
            }
            const state = this._controlledReadableByteStream._state;
            if (state !== "readable") {
              throw new TypeError(`The stream (in ${state} state) is not in the readable state and cannot be enqueued to`);
            }
            ReadableByteStreamControllerEnqueue(this, chunk);
          }
          error(e2 = void 0) {
            if (!IsReadableByteStreamController(this)) {
              throw byteStreamControllerBrandCheckException("error");
            }
            ReadableByteStreamControllerError(this, e2);
          }
          [CancelSteps](reason) {
            ReadableByteStreamControllerClearPendingPullIntos(this);
            ResetQueue(this);
            const result = this._cancelAlgorithm(reason);
            ReadableByteStreamControllerClearAlgorithms(this);
            return result;
          }
          [PullSteps](readRequest) {
            const stream = this._controlledReadableByteStream;
            if (this._queueTotalSize > 0) {
              const entry4 = this._queue.shift();
              this._queueTotalSize -= entry4.byteLength;
              ReadableByteStreamControllerHandleQueueDrain(this);
              const view = new Uint8Array(entry4.buffer, entry4.byteOffset, entry4.byteLength);
              readRequest._chunkSteps(view);
              return;
            }
            const autoAllocateChunkSize = this._autoAllocateChunkSize;
            if (autoAllocateChunkSize !== void 0) {
              let buffer;
              try {
                buffer = new ArrayBuffer(autoAllocateChunkSize);
              } catch (bufferE) {
                readRequest._errorSteps(bufferE);
                return;
              }
              const pullIntoDescriptor = {
                buffer,
                bufferByteLength: autoAllocateChunkSize,
                byteOffset: 0,
                byteLength: autoAllocateChunkSize,
                bytesFilled: 0,
                elementSize: 1,
                viewConstructor: Uint8Array,
                readerType: "default"
              };
              this._pendingPullIntos.push(pullIntoDescriptor);
            }
            ReadableStreamAddReadRequest(stream, readRequest);
            ReadableByteStreamControllerCallPullIfNeeded(this);
          }
        }
        Object.defineProperties(ReadableByteStreamController.prototype, {
          close: { enumerable: true },
          enqueue: { enumerable: true },
          error: { enumerable: true },
          byobRequest: { enumerable: true },
          desiredSize: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(ReadableByteStreamController.prototype, SymbolPolyfill.toStringTag, {
            value: "ReadableByteStreamController",
            configurable: true
          });
        }
        function IsReadableByteStreamController(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_controlledReadableByteStream")) {
            return false;
          }
          return x2 instanceof ReadableByteStreamController;
        }
        function IsReadableStreamBYOBRequest(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_associatedReadableByteStreamController")) {
            return false;
          }
          return x2 instanceof ReadableStreamBYOBRequest;
        }
        function ReadableByteStreamControllerCallPullIfNeeded(controller) {
          const shouldPull = ReadableByteStreamControllerShouldCallPull(controller);
          if (!shouldPull) {
            return;
          }
          if (controller._pulling) {
            controller._pullAgain = true;
            return;
          }
          controller._pulling = true;
          const pullPromise = controller._pullAlgorithm();
          uponPromise(pullPromise, () => {
            controller._pulling = false;
            if (controller._pullAgain) {
              controller._pullAgain = false;
              ReadableByteStreamControllerCallPullIfNeeded(controller);
            }
          }, (e2) => {
            ReadableByteStreamControllerError(controller, e2);
          });
        }
        function ReadableByteStreamControllerClearPendingPullIntos(controller) {
          ReadableByteStreamControllerInvalidateBYOBRequest(controller);
          controller._pendingPullIntos = new SimpleQueue();
        }
        function ReadableByteStreamControllerCommitPullIntoDescriptor(stream, pullIntoDescriptor) {
          let done = false;
          if (stream._state === "closed") {
            done = true;
          }
          const filledView = ReadableByteStreamControllerConvertPullIntoDescriptor(pullIntoDescriptor);
          if (pullIntoDescriptor.readerType === "default") {
            ReadableStreamFulfillReadRequest(stream, filledView, done);
          } else {
            ReadableStreamFulfillReadIntoRequest(stream, filledView, done);
          }
        }
        function ReadableByteStreamControllerConvertPullIntoDescriptor(pullIntoDescriptor) {
          const bytesFilled = pullIntoDescriptor.bytesFilled;
          const elementSize = pullIntoDescriptor.elementSize;
          return new pullIntoDescriptor.viewConstructor(pullIntoDescriptor.buffer, pullIntoDescriptor.byteOffset, bytesFilled / elementSize);
        }
        function ReadableByteStreamControllerEnqueueChunkToQueue(controller, buffer, byteOffset, byteLength) {
          controller._queue.push({ buffer, byteOffset, byteLength });
          controller._queueTotalSize += byteLength;
        }
        function ReadableByteStreamControllerFillPullIntoDescriptorFromQueue(controller, pullIntoDescriptor) {
          const elementSize = pullIntoDescriptor.elementSize;
          const currentAlignedBytes = pullIntoDescriptor.bytesFilled - pullIntoDescriptor.bytesFilled % elementSize;
          const maxBytesToCopy = Math.min(controller._queueTotalSize, pullIntoDescriptor.byteLength - pullIntoDescriptor.bytesFilled);
          const maxBytesFilled = pullIntoDescriptor.bytesFilled + maxBytesToCopy;
          const maxAlignedBytes = maxBytesFilled - maxBytesFilled % elementSize;
          let totalBytesToCopyRemaining = maxBytesToCopy;
          let ready = false;
          if (maxAlignedBytes > currentAlignedBytes) {
            totalBytesToCopyRemaining = maxAlignedBytes - pullIntoDescriptor.bytesFilled;
            ready = true;
          }
          const queue = controller._queue;
          while (totalBytesToCopyRemaining > 0) {
            const headOfQueue = queue.peek();
            const bytesToCopy = Math.min(totalBytesToCopyRemaining, headOfQueue.byteLength);
            const destStart = pullIntoDescriptor.byteOffset + pullIntoDescriptor.bytesFilled;
            CopyDataBlockBytes(pullIntoDescriptor.buffer, destStart, headOfQueue.buffer, headOfQueue.byteOffset, bytesToCopy);
            if (headOfQueue.byteLength === bytesToCopy) {
              queue.shift();
            } else {
              headOfQueue.byteOffset += bytesToCopy;
              headOfQueue.byteLength -= bytesToCopy;
            }
            controller._queueTotalSize -= bytesToCopy;
            ReadableByteStreamControllerFillHeadPullIntoDescriptor(controller, bytesToCopy, pullIntoDescriptor);
            totalBytesToCopyRemaining -= bytesToCopy;
          }
          return ready;
        }
        function ReadableByteStreamControllerFillHeadPullIntoDescriptor(controller, size, pullIntoDescriptor) {
          pullIntoDescriptor.bytesFilled += size;
        }
        function ReadableByteStreamControllerHandleQueueDrain(controller) {
          if (controller._queueTotalSize === 0 && controller._closeRequested) {
            ReadableByteStreamControllerClearAlgorithms(controller);
            ReadableStreamClose(controller._controlledReadableByteStream);
          } else {
            ReadableByteStreamControllerCallPullIfNeeded(controller);
          }
        }
        function ReadableByteStreamControllerInvalidateBYOBRequest(controller) {
          if (controller._byobRequest === null) {
            return;
          }
          controller._byobRequest._associatedReadableByteStreamController = void 0;
          controller._byobRequest._view = null;
          controller._byobRequest = null;
        }
        function ReadableByteStreamControllerProcessPullIntoDescriptorsUsingQueue(controller) {
          while (controller._pendingPullIntos.length > 0) {
            if (controller._queueTotalSize === 0) {
              return;
            }
            const pullIntoDescriptor = controller._pendingPullIntos.peek();
            if (ReadableByteStreamControllerFillPullIntoDescriptorFromQueue(controller, pullIntoDescriptor)) {
              ReadableByteStreamControllerShiftPendingPullInto(controller);
              ReadableByteStreamControllerCommitPullIntoDescriptor(controller._controlledReadableByteStream, pullIntoDescriptor);
            }
          }
        }
        function ReadableByteStreamControllerPullInto(controller, view, readIntoRequest) {
          const stream = controller._controlledReadableByteStream;
          let elementSize = 1;
          if (view.constructor !== DataView) {
            elementSize = view.constructor.BYTES_PER_ELEMENT;
          }
          const ctor = view.constructor;
          const buffer = TransferArrayBuffer(view.buffer);
          const pullIntoDescriptor = {
            buffer,
            bufferByteLength: buffer.byteLength,
            byteOffset: view.byteOffset,
            byteLength: view.byteLength,
            bytesFilled: 0,
            elementSize,
            viewConstructor: ctor,
            readerType: "byob"
          };
          if (controller._pendingPullIntos.length > 0) {
            controller._pendingPullIntos.push(pullIntoDescriptor);
            ReadableStreamAddReadIntoRequest(stream, readIntoRequest);
            return;
          }
          if (stream._state === "closed") {
            const emptyView = new ctor(pullIntoDescriptor.buffer, pullIntoDescriptor.byteOffset, 0);
            readIntoRequest._closeSteps(emptyView);
            return;
          }
          if (controller._queueTotalSize > 0) {
            if (ReadableByteStreamControllerFillPullIntoDescriptorFromQueue(controller, pullIntoDescriptor)) {
              const filledView = ReadableByteStreamControllerConvertPullIntoDescriptor(pullIntoDescriptor);
              ReadableByteStreamControllerHandleQueueDrain(controller);
              readIntoRequest._chunkSteps(filledView);
              return;
            }
            if (controller._closeRequested) {
              const e2 = new TypeError("Insufficient bytes to fill elements in the given buffer");
              ReadableByteStreamControllerError(controller, e2);
              readIntoRequest._errorSteps(e2);
              return;
            }
          }
          controller._pendingPullIntos.push(pullIntoDescriptor);
          ReadableStreamAddReadIntoRequest(stream, readIntoRequest);
          ReadableByteStreamControllerCallPullIfNeeded(controller);
        }
        function ReadableByteStreamControllerRespondInClosedState(controller, firstDescriptor) {
          const stream = controller._controlledReadableByteStream;
          if (ReadableStreamHasBYOBReader(stream)) {
            while (ReadableStreamGetNumReadIntoRequests(stream) > 0) {
              const pullIntoDescriptor = ReadableByteStreamControllerShiftPendingPullInto(controller);
              ReadableByteStreamControllerCommitPullIntoDescriptor(stream, pullIntoDescriptor);
            }
          }
        }
        function ReadableByteStreamControllerRespondInReadableState(controller, bytesWritten, pullIntoDescriptor) {
          ReadableByteStreamControllerFillHeadPullIntoDescriptor(controller, bytesWritten, pullIntoDescriptor);
          if (pullIntoDescriptor.bytesFilled < pullIntoDescriptor.elementSize) {
            return;
          }
          ReadableByteStreamControllerShiftPendingPullInto(controller);
          const remainderSize = pullIntoDescriptor.bytesFilled % pullIntoDescriptor.elementSize;
          if (remainderSize > 0) {
            const end = pullIntoDescriptor.byteOffset + pullIntoDescriptor.bytesFilled;
            const remainder = ArrayBufferSlice(pullIntoDescriptor.buffer, end - remainderSize, end);
            ReadableByteStreamControllerEnqueueChunkToQueue(controller, remainder, 0, remainder.byteLength);
          }
          pullIntoDescriptor.bytesFilled -= remainderSize;
          ReadableByteStreamControllerCommitPullIntoDescriptor(controller._controlledReadableByteStream, pullIntoDescriptor);
          ReadableByteStreamControllerProcessPullIntoDescriptorsUsingQueue(controller);
        }
        function ReadableByteStreamControllerRespondInternal(controller, bytesWritten) {
          const firstDescriptor = controller._pendingPullIntos.peek();
          ReadableByteStreamControllerInvalidateBYOBRequest(controller);
          const state = controller._controlledReadableByteStream._state;
          if (state === "closed") {
            ReadableByteStreamControllerRespondInClosedState(controller);
          } else {
            ReadableByteStreamControllerRespondInReadableState(controller, bytesWritten, firstDescriptor);
          }
          ReadableByteStreamControllerCallPullIfNeeded(controller);
        }
        function ReadableByteStreamControllerShiftPendingPullInto(controller) {
          const descriptor = controller._pendingPullIntos.shift();
          return descriptor;
        }
        function ReadableByteStreamControllerShouldCallPull(controller) {
          const stream = controller._controlledReadableByteStream;
          if (stream._state !== "readable") {
            return false;
          }
          if (controller._closeRequested) {
            return false;
          }
          if (!controller._started) {
            return false;
          }
          if (ReadableStreamHasDefaultReader(stream) && ReadableStreamGetNumReadRequests(stream) > 0) {
            return true;
          }
          if (ReadableStreamHasBYOBReader(stream) && ReadableStreamGetNumReadIntoRequests(stream) > 0) {
            return true;
          }
          const desiredSize = ReadableByteStreamControllerGetDesiredSize(controller);
          if (desiredSize > 0) {
            return true;
          }
          return false;
        }
        function ReadableByteStreamControllerClearAlgorithms(controller) {
          controller._pullAlgorithm = void 0;
          controller._cancelAlgorithm = void 0;
        }
        function ReadableByteStreamControllerClose(controller) {
          const stream = controller._controlledReadableByteStream;
          if (controller._closeRequested || stream._state !== "readable") {
            return;
          }
          if (controller._queueTotalSize > 0) {
            controller._closeRequested = true;
            return;
          }
          if (controller._pendingPullIntos.length > 0) {
            const firstPendingPullInto = controller._pendingPullIntos.peek();
            if (firstPendingPullInto.bytesFilled > 0) {
              const e2 = new TypeError("Insufficient bytes to fill elements in the given buffer");
              ReadableByteStreamControllerError(controller, e2);
              throw e2;
            }
          }
          ReadableByteStreamControllerClearAlgorithms(controller);
          ReadableStreamClose(stream);
        }
        function ReadableByteStreamControllerEnqueue(controller, chunk) {
          const stream = controller._controlledReadableByteStream;
          if (controller._closeRequested || stream._state !== "readable") {
            return;
          }
          const buffer = chunk.buffer;
          const byteOffset = chunk.byteOffset;
          const byteLength = chunk.byteLength;
          const transferredBuffer = TransferArrayBuffer(buffer);
          if (controller._pendingPullIntos.length > 0) {
            const firstPendingPullInto = controller._pendingPullIntos.peek();
            if (IsDetachedBuffer(firstPendingPullInto.buffer))
              ;
            firstPendingPullInto.buffer = TransferArrayBuffer(firstPendingPullInto.buffer);
          }
          ReadableByteStreamControllerInvalidateBYOBRequest(controller);
          if (ReadableStreamHasDefaultReader(stream)) {
            if (ReadableStreamGetNumReadRequests(stream) === 0) {
              ReadableByteStreamControllerEnqueueChunkToQueue(controller, transferredBuffer, byteOffset, byteLength);
            } else {
              if (controller._pendingPullIntos.length > 0) {
                ReadableByteStreamControllerShiftPendingPullInto(controller);
              }
              const transferredView = new Uint8Array(transferredBuffer, byteOffset, byteLength);
              ReadableStreamFulfillReadRequest(stream, transferredView, false);
            }
          } else if (ReadableStreamHasBYOBReader(stream)) {
            ReadableByteStreamControllerEnqueueChunkToQueue(controller, transferredBuffer, byteOffset, byteLength);
            ReadableByteStreamControllerProcessPullIntoDescriptorsUsingQueue(controller);
          } else {
            ReadableByteStreamControllerEnqueueChunkToQueue(controller, transferredBuffer, byteOffset, byteLength);
          }
          ReadableByteStreamControllerCallPullIfNeeded(controller);
        }
        function ReadableByteStreamControllerError(controller, e2) {
          const stream = controller._controlledReadableByteStream;
          if (stream._state !== "readable") {
            return;
          }
          ReadableByteStreamControllerClearPendingPullIntos(controller);
          ResetQueue(controller);
          ReadableByteStreamControllerClearAlgorithms(controller);
          ReadableStreamError(stream, e2);
        }
        function ReadableByteStreamControllerGetBYOBRequest(controller) {
          if (controller._byobRequest === null && controller._pendingPullIntos.length > 0) {
            const firstDescriptor = controller._pendingPullIntos.peek();
            const view = new Uint8Array(firstDescriptor.buffer, firstDescriptor.byteOffset + firstDescriptor.bytesFilled, firstDescriptor.byteLength - firstDescriptor.bytesFilled);
            const byobRequest = Object.create(ReadableStreamBYOBRequest.prototype);
            SetUpReadableStreamBYOBRequest(byobRequest, controller, view);
            controller._byobRequest = byobRequest;
          }
          return controller._byobRequest;
        }
        function ReadableByteStreamControllerGetDesiredSize(controller) {
          const state = controller._controlledReadableByteStream._state;
          if (state === "errored") {
            return null;
          }
          if (state === "closed") {
            return 0;
          }
          return controller._strategyHWM - controller._queueTotalSize;
        }
        function ReadableByteStreamControllerRespond(controller, bytesWritten) {
          const firstDescriptor = controller._pendingPullIntos.peek();
          const state = controller._controlledReadableByteStream._state;
          if (state === "closed") {
            if (bytesWritten !== 0) {
              throw new TypeError("bytesWritten must be 0 when calling respond() on a closed stream");
            }
          } else {
            if (bytesWritten === 0) {
              throw new TypeError("bytesWritten must be greater than 0 when calling respond() on a readable stream");
            }
            if (firstDescriptor.bytesFilled + bytesWritten > firstDescriptor.byteLength) {
              throw new RangeError("bytesWritten out of range");
            }
          }
          firstDescriptor.buffer = TransferArrayBuffer(firstDescriptor.buffer);
          ReadableByteStreamControllerRespondInternal(controller, bytesWritten);
        }
        function ReadableByteStreamControllerRespondWithNewView(controller, view) {
          const firstDescriptor = controller._pendingPullIntos.peek();
          const state = controller._controlledReadableByteStream._state;
          if (state === "closed") {
            if (view.byteLength !== 0) {
              throw new TypeError("The view's length must be 0 when calling respondWithNewView() on a closed stream");
            }
          } else {
            if (view.byteLength === 0) {
              throw new TypeError("The view's length must be greater than 0 when calling respondWithNewView() on a readable stream");
            }
          }
          if (firstDescriptor.byteOffset + firstDescriptor.bytesFilled !== view.byteOffset) {
            throw new RangeError("The region specified by view does not match byobRequest");
          }
          if (firstDescriptor.bufferByteLength !== view.buffer.byteLength) {
            throw new RangeError("The buffer of view has different capacity than byobRequest");
          }
          if (firstDescriptor.bytesFilled + view.byteLength > firstDescriptor.byteLength) {
            throw new RangeError("The region specified by view is larger than byobRequest");
          }
          const viewByteLength = view.byteLength;
          firstDescriptor.buffer = TransferArrayBuffer(view.buffer);
          ReadableByteStreamControllerRespondInternal(controller, viewByteLength);
        }
        function SetUpReadableByteStreamController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, autoAllocateChunkSize) {
          controller._controlledReadableByteStream = stream;
          controller._pullAgain = false;
          controller._pulling = false;
          controller._byobRequest = null;
          controller._queue = controller._queueTotalSize = void 0;
          ResetQueue(controller);
          controller._closeRequested = false;
          controller._started = false;
          controller._strategyHWM = highWaterMark;
          controller._pullAlgorithm = pullAlgorithm;
          controller._cancelAlgorithm = cancelAlgorithm;
          controller._autoAllocateChunkSize = autoAllocateChunkSize;
          controller._pendingPullIntos = new SimpleQueue();
          stream._readableStreamController = controller;
          const startResult = startAlgorithm();
          uponPromise(promiseResolvedWith(startResult), () => {
            controller._started = true;
            ReadableByteStreamControllerCallPullIfNeeded(controller);
          }, (r2) => {
            ReadableByteStreamControllerError(controller, r2);
          });
        }
        function SetUpReadableByteStreamControllerFromUnderlyingSource(stream, underlyingByteSource, highWaterMark) {
          const controller = Object.create(ReadableByteStreamController.prototype);
          let startAlgorithm = () => void 0;
          let pullAlgorithm = () => promiseResolvedWith(void 0);
          let cancelAlgorithm = () => promiseResolvedWith(void 0);
          if (underlyingByteSource.start !== void 0) {
            startAlgorithm = () => underlyingByteSource.start(controller);
          }
          if (underlyingByteSource.pull !== void 0) {
            pullAlgorithm = () => underlyingByteSource.pull(controller);
          }
          if (underlyingByteSource.cancel !== void 0) {
            cancelAlgorithm = (reason) => underlyingByteSource.cancel(reason);
          }
          const autoAllocateChunkSize = underlyingByteSource.autoAllocateChunkSize;
          if (autoAllocateChunkSize === 0) {
            throw new TypeError("autoAllocateChunkSize must be greater than 0");
          }
          SetUpReadableByteStreamController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, autoAllocateChunkSize);
        }
        function SetUpReadableStreamBYOBRequest(request, controller, view) {
          request._associatedReadableByteStreamController = controller;
          request._view = view;
        }
        function byobRequestBrandCheckException(name) {
          return new TypeError(`ReadableStreamBYOBRequest.prototype.${name} can only be used on a ReadableStreamBYOBRequest`);
        }
        function byteStreamControllerBrandCheckException(name) {
          return new TypeError(`ReadableByteStreamController.prototype.${name} can only be used on a ReadableByteStreamController`);
        }
        function AcquireReadableStreamBYOBReader(stream) {
          return new ReadableStreamBYOBReader(stream);
        }
        function ReadableStreamAddReadIntoRequest(stream, readIntoRequest) {
          stream._reader._readIntoRequests.push(readIntoRequest);
        }
        function ReadableStreamFulfillReadIntoRequest(stream, chunk, done) {
          const reader = stream._reader;
          const readIntoRequest = reader._readIntoRequests.shift();
          if (done) {
            readIntoRequest._closeSteps(chunk);
          } else {
            readIntoRequest._chunkSteps(chunk);
          }
        }
        function ReadableStreamGetNumReadIntoRequests(stream) {
          return stream._reader._readIntoRequests.length;
        }
        function ReadableStreamHasBYOBReader(stream) {
          const reader = stream._reader;
          if (reader === void 0) {
            return false;
          }
          if (!IsReadableStreamBYOBReader(reader)) {
            return false;
          }
          return true;
        }
        class ReadableStreamBYOBReader {
          constructor(stream) {
            assertRequiredArgument(stream, 1, "ReadableStreamBYOBReader");
            assertReadableStream(stream, "First parameter");
            if (IsReadableStreamLocked(stream)) {
              throw new TypeError("This stream has already been locked for exclusive reading by another reader");
            }
            if (!IsReadableByteStreamController(stream._readableStreamController)) {
              throw new TypeError("Cannot construct a ReadableStreamBYOBReader for a stream not constructed with a byte source");
            }
            ReadableStreamReaderGenericInitialize(this, stream);
            this._readIntoRequests = new SimpleQueue();
          }
          get closed() {
            if (!IsReadableStreamBYOBReader(this)) {
              return promiseRejectedWith(byobReaderBrandCheckException("closed"));
            }
            return this._closedPromise;
          }
          cancel(reason = void 0) {
            if (!IsReadableStreamBYOBReader(this)) {
              return promiseRejectedWith(byobReaderBrandCheckException("cancel"));
            }
            if (this._ownerReadableStream === void 0) {
              return promiseRejectedWith(readerLockException("cancel"));
            }
            return ReadableStreamReaderGenericCancel(this, reason);
          }
          read(view) {
            if (!IsReadableStreamBYOBReader(this)) {
              return promiseRejectedWith(byobReaderBrandCheckException("read"));
            }
            if (!ArrayBuffer.isView(view)) {
              return promiseRejectedWith(new TypeError("view must be an array buffer view"));
            }
            if (view.byteLength === 0) {
              return promiseRejectedWith(new TypeError("view must have non-zero byteLength"));
            }
            if (view.buffer.byteLength === 0) {
              return promiseRejectedWith(new TypeError(`view's buffer must have non-zero byteLength`));
            }
            if (IsDetachedBuffer(view.buffer))
              ;
            if (this._ownerReadableStream === void 0) {
              return promiseRejectedWith(readerLockException("read from"));
            }
            let resolvePromise;
            let rejectPromise;
            const promise = newPromise((resolve2, reject) => {
              resolvePromise = resolve2;
              rejectPromise = reject;
            });
            const readIntoRequest = {
              _chunkSteps: (chunk) => resolvePromise({ value: chunk, done: false }),
              _closeSteps: (chunk) => resolvePromise({ value: chunk, done: true }),
              _errorSteps: (e2) => rejectPromise(e2)
            };
            ReadableStreamBYOBReaderRead(this, view, readIntoRequest);
            return promise;
          }
          releaseLock() {
            if (!IsReadableStreamBYOBReader(this)) {
              throw byobReaderBrandCheckException("releaseLock");
            }
            if (this._ownerReadableStream === void 0) {
              return;
            }
            if (this._readIntoRequests.length > 0) {
              throw new TypeError("Tried to release a reader lock when that reader has pending read() calls un-settled");
            }
            ReadableStreamReaderGenericRelease(this);
          }
        }
        Object.defineProperties(ReadableStreamBYOBReader.prototype, {
          cancel: { enumerable: true },
          read: { enumerable: true },
          releaseLock: { enumerable: true },
          closed: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(ReadableStreamBYOBReader.prototype, SymbolPolyfill.toStringTag, {
            value: "ReadableStreamBYOBReader",
            configurable: true
          });
        }
        function IsReadableStreamBYOBReader(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_readIntoRequests")) {
            return false;
          }
          return x2 instanceof ReadableStreamBYOBReader;
        }
        function ReadableStreamBYOBReaderRead(reader, view, readIntoRequest) {
          const stream = reader._ownerReadableStream;
          stream._disturbed = true;
          if (stream._state === "errored") {
            readIntoRequest._errorSteps(stream._storedError);
          } else {
            ReadableByteStreamControllerPullInto(stream._readableStreamController, view, readIntoRequest);
          }
        }
        function byobReaderBrandCheckException(name) {
          return new TypeError(`ReadableStreamBYOBReader.prototype.${name} can only be used on a ReadableStreamBYOBReader`);
        }
        function ExtractHighWaterMark(strategy, defaultHWM) {
          const { highWaterMark } = strategy;
          if (highWaterMark === void 0) {
            return defaultHWM;
          }
          if (NumberIsNaN(highWaterMark) || highWaterMark < 0) {
            throw new RangeError("Invalid highWaterMark");
          }
          return highWaterMark;
        }
        function ExtractSizeAlgorithm(strategy) {
          const { size } = strategy;
          if (!size) {
            return () => 1;
          }
          return size;
        }
        function convertQueuingStrategy(init2, context) {
          assertDictionary(init2, context);
          const highWaterMark = init2 === null || init2 === void 0 ? void 0 : init2.highWaterMark;
          const size = init2 === null || init2 === void 0 ? void 0 : init2.size;
          return {
            highWaterMark: highWaterMark === void 0 ? void 0 : convertUnrestrictedDouble(highWaterMark),
            size: size === void 0 ? void 0 : convertQueuingStrategySize(size, `${context} has member 'size' that`)
          };
        }
        function convertQueuingStrategySize(fn, context) {
          assertFunction(fn, context);
          return (chunk) => convertUnrestrictedDouble(fn(chunk));
        }
        function convertUnderlyingSink(original, context) {
          assertDictionary(original, context);
          const abort = original === null || original === void 0 ? void 0 : original.abort;
          const close = original === null || original === void 0 ? void 0 : original.close;
          const start = original === null || original === void 0 ? void 0 : original.start;
          const type = original === null || original === void 0 ? void 0 : original.type;
          const write = original === null || original === void 0 ? void 0 : original.write;
          return {
            abort: abort === void 0 ? void 0 : convertUnderlyingSinkAbortCallback(abort, original, `${context} has member 'abort' that`),
            close: close === void 0 ? void 0 : convertUnderlyingSinkCloseCallback(close, original, `${context} has member 'close' that`),
            start: start === void 0 ? void 0 : convertUnderlyingSinkStartCallback(start, original, `${context} has member 'start' that`),
            write: write === void 0 ? void 0 : convertUnderlyingSinkWriteCallback(write, original, `${context} has member 'write' that`),
            type
          };
        }
        function convertUnderlyingSinkAbortCallback(fn, original, context) {
          assertFunction(fn, context);
          return (reason) => promiseCall(fn, original, [reason]);
        }
        function convertUnderlyingSinkCloseCallback(fn, original, context) {
          assertFunction(fn, context);
          return () => promiseCall(fn, original, []);
        }
        function convertUnderlyingSinkStartCallback(fn, original, context) {
          assertFunction(fn, context);
          return (controller) => reflectCall(fn, original, [controller]);
        }
        function convertUnderlyingSinkWriteCallback(fn, original, context) {
          assertFunction(fn, context);
          return (chunk, controller) => promiseCall(fn, original, [chunk, controller]);
        }
        function assertWritableStream(x2, context) {
          if (!IsWritableStream(x2)) {
            throw new TypeError(`${context} is not a WritableStream.`);
          }
        }
        function isAbortSignal2(value) {
          if (typeof value !== "object" || value === null) {
            return false;
          }
          try {
            return typeof value.aborted === "boolean";
          } catch (_a4) {
            return false;
          }
        }
        const supportsAbortController = typeof AbortController === "function";
        function createAbortController() {
          if (supportsAbortController) {
            return new AbortController();
          }
          return void 0;
        }
        class WritableStream {
          constructor(rawUnderlyingSink = {}, rawStrategy = {}) {
            if (rawUnderlyingSink === void 0) {
              rawUnderlyingSink = null;
            } else {
              assertObject(rawUnderlyingSink, "First parameter");
            }
            const strategy = convertQueuingStrategy(rawStrategy, "Second parameter");
            const underlyingSink = convertUnderlyingSink(rawUnderlyingSink, "First parameter");
            InitializeWritableStream(this);
            const type = underlyingSink.type;
            if (type !== void 0) {
              throw new RangeError("Invalid type is specified");
            }
            const sizeAlgorithm = ExtractSizeAlgorithm(strategy);
            const highWaterMark = ExtractHighWaterMark(strategy, 1);
            SetUpWritableStreamDefaultControllerFromUnderlyingSink(this, underlyingSink, highWaterMark, sizeAlgorithm);
          }
          get locked() {
            if (!IsWritableStream(this)) {
              throw streamBrandCheckException$2("locked");
            }
            return IsWritableStreamLocked(this);
          }
          abort(reason = void 0) {
            if (!IsWritableStream(this)) {
              return promiseRejectedWith(streamBrandCheckException$2("abort"));
            }
            if (IsWritableStreamLocked(this)) {
              return promiseRejectedWith(new TypeError("Cannot abort a stream that already has a writer"));
            }
            return WritableStreamAbort(this, reason);
          }
          close() {
            if (!IsWritableStream(this)) {
              return promiseRejectedWith(streamBrandCheckException$2("close"));
            }
            if (IsWritableStreamLocked(this)) {
              return promiseRejectedWith(new TypeError("Cannot close a stream that already has a writer"));
            }
            if (WritableStreamCloseQueuedOrInFlight(this)) {
              return promiseRejectedWith(new TypeError("Cannot close an already-closing stream"));
            }
            return WritableStreamClose(this);
          }
          getWriter() {
            if (!IsWritableStream(this)) {
              throw streamBrandCheckException$2("getWriter");
            }
            return AcquireWritableStreamDefaultWriter(this);
          }
        }
        Object.defineProperties(WritableStream.prototype, {
          abort: { enumerable: true },
          close: { enumerable: true },
          getWriter: { enumerable: true },
          locked: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(WritableStream.prototype, SymbolPolyfill.toStringTag, {
            value: "WritableStream",
            configurable: true
          });
        }
        function AcquireWritableStreamDefaultWriter(stream) {
          return new WritableStreamDefaultWriter(stream);
        }
        function CreateWritableStream(startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, highWaterMark = 1, sizeAlgorithm = () => 1) {
          const stream = Object.create(WritableStream.prototype);
          InitializeWritableStream(stream);
          const controller = Object.create(WritableStreamDefaultController.prototype);
          SetUpWritableStreamDefaultController(stream, controller, startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, highWaterMark, sizeAlgorithm);
          return stream;
        }
        function InitializeWritableStream(stream) {
          stream._state = "writable";
          stream._storedError = void 0;
          stream._writer = void 0;
          stream._writableStreamController = void 0;
          stream._writeRequests = new SimpleQueue();
          stream._inFlightWriteRequest = void 0;
          stream._closeRequest = void 0;
          stream._inFlightCloseRequest = void 0;
          stream._pendingAbortRequest = void 0;
          stream._backpressure = false;
        }
        function IsWritableStream(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_writableStreamController")) {
            return false;
          }
          return x2 instanceof WritableStream;
        }
        function IsWritableStreamLocked(stream) {
          if (stream._writer === void 0) {
            return false;
          }
          return true;
        }
        function WritableStreamAbort(stream, reason) {
          var _a4;
          if (stream._state === "closed" || stream._state === "errored") {
            return promiseResolvedWith(void 0);
          }
          stream._writableStreamController._abortReason = reason;
          (_a4 = stream._writableStreamController._abortController) === null || _a4 === void 0 ? void 0 : _a4.abort();
          const state = stream._state;
          if (state === "closed" || state === "errored") {
            return promiseResolvedWith(void 0);
          }
          if (stream._pendingAbortRequest !== void 0) {
            return stream._pendingAbortRequest._promise;
          }
          let wasAlreadyErroring = false;
          if (state === "erroring") {
            wasAlreadyErroring = true;
            reason = void 0;
          }
          const promise = newPromise((resolve2, reject) => {
            stream._pendingAbortRequest = {
              _promise: void 0,
              _resolve: resolve2,
              _reject: reject,
              _reason: reason,
              _wasAlreadyErroring: wasAlreadyErroring
            };
          });
          stream._pendingAbortRequest._promise = promise;
          if (!wasAlreadyErroring) {
            WritableStreamStartErroring(stream, reason);
          }
          return promise;
        }
        function WritableStreamClose(stream) {
          const state = stream._state;
          if (state === "closed" || state === "errored") {
            return promiseRejectedWith(new TypeError(`The stream (in ${state} state) is not in the writable state and cannot be closed`));
          }
          const promise = newPromise((resolve2, reject) => {
            const closeRequest = {
              _resolve: resolve2,
              _reject: reject
            };
            stream._closeRequest = closeRequest;
          });
          const writer = stream._writer;
          if (writer !== void 0 && stream._backpressure && state === "writable") {
            defaultWriterReadyPromiseResolve(writer);
          }
          WritableStreamDefaultControllerClose(stream._writableStreamController);
          return promise;
        }
        function WritableStreamAddWriteRequest(stream) {
          const promise = newPromise((resolve2, reject) => {
            const writeRequest = {
              _resolve: resolve2,
              _reject: reject
            };
            stream._writeRequests.push(writeRequest);
          });
          return promise;
        }
        function WritableStreamDealWithRejection(stream, error2) {
          const state = stream._state;
          if (state === "writable") {
            WritableStreamStartErroring(stream, error2);
            return;
          }
          WritableStreamFinishErroring(stream);
        }
        function WritableStreamStartErroring(stream, reason) {
          const controller = stream._writableStreamController;
          stream._state = "erroring";
          stream._storedError = reason;
          const writer = stream._writer;
          if (writer !== void 0) {
            WritableStreamDefaultWriterEnsureReadyPromiseRejected(writer, reason);
          }
          if (!WritableStreamHasOperationMarkedInFlight(stream) && controller._started) {
            WritableStreamFinishErroring(stream);
          }
        }
        function WritableStreamFinishErroring(stream) {
          stream._state = "errored";
          stream._writableStreamController[ErrorSteps]();
          const storedError = stream._storedError;
          stream._writeRequests.forEach((writeRequest) => {
            writeRequest._reject(storedError);
          });
          stream._writeRequests = new SimpleQueue();
          if (stream._pendingAbortRequest === void 0) {
            WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream);
            return;
          }
          const abortRequest = stream._pendingAbortRequest;
          stream._pendingAbortRequest = void 0;
          if (abortRequest._wasAlreadyErroring) {
            abortRequest._reject(storedError);
            WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream);
            return;
          }
          const promise = stream._writableStreamController[AbortSteps](abortRequest._reason);
          uponPromise(promise, () => {
            abortRequest._resolve();
            WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream);
          }, (reason) => {
            abortRequest._reject(reason);
            WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream);
          });
        }
        function WritableStreamFinishInFlightWrite(stream) {
          stream._inFlightWriteRequest._resolve(void 0);
          stream._inFlightWriteRequest = void 0;
        }
        function WritableStreamFinishInFlightWriteWithError(stream, error2) {
          stream._inFlightWriteRequest._reject(error2);
          stream._inFlightWriteRequest = void 0;
          WritableStreamDealWithRejection(stream, error2);
        }
        function WritableStreamFinishInFlightClose(stream) {
          stream._inFlightCloseRequest._resolve(void 0);
          stream._inFlightCloseRequest = void 0;
          const state = stream._state;
          if (state === "erroring") {
            stream._storedError = void 0;
            if (stream._pendingAbortRequest !== void 0) {
              stream._pendingAbortRequest._resolve();
              stream._pendingAbortRequest = void 0;
            }
          }
          stream._state = "closed";
          const writer = stream._writer;
          if (writer !== void 0) {
            defaultWriterClosedPromiseResolve(writer);
          }
        }
        function WritableStreamFinishInFlightCloseWithError(stream, error2) {
          stream._inFlightCloseRequest._reject(error2);
          stream._inFlightCloseRequest = void 0;
          if (stream._pendingAbortRequest !== void 0) {
            stream._pendingAbortRequest._reject(error2);
            stream._pendingAbortRequest = void 0;
          }
          WritableStreamDealWithRejection(stream, error2);
        }
        function WritableStreamCloseQueuedOrInFlight(stream) {
          if (stream._closeRequest === void 0 && stream._inFlightCloseRequest === void 0) {
            return false;
          }
          return true;
        }
        function WritableStreamHasOperationMarkedInFlight(stream) {
          if (stream._inFlightWriteRequest === void 0 && stream._inFlightCloseRequest === void 0) {
            return false;
          }
          return true;
        }
        function WritableStreamMarkCloseRequestInFlight(stream) {
          stream._inFlightCloseRequest = stream._closeRequest;
          stream._closeRequest = void 0;
        }
        function WritableStreamMarkFirstWriteRequestInFlight(stream) {
          stream._inFlightWriteRequest = stream._writeRequests.shift();
        }
        function WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream) {
          if (stream._closeRequest !== void 0) {
            stream._closeRequest._reject(stream._storedError);
            stream._closeRequest = void 0;
          }
          const writer = stream._writer;
          if (writer !== void 0) {
            defaultWriterClosedPromiseReject(writer, stream._storedError);
          }
        }
        function WritableStreamUpdateBackpressure(stream, backpressure) {
          const writer = stream._writer;
          if (writer !== void 0 && backpressure !== stream._backpressure) {
            if (backpressure) {
              defaultWriterReadyPromiseReset(writer);
            } else {
              defaultWriterReadyPromiseResolve(writer);
            }
          }
          stream._backpressure = backpressure;
        }
        class WritableStreamDefaultWriter {
          constructor(stream) {
            assertRequiredArgument(stream, 1, "WritableStreamDefaultWriter");
            assertWritableStream(stream, "First parameter");
            if (IsWritableStreamLocked(stream)) {
              throw new TypeError("This stream has already been locked for exclusive writing by another writer");
            }
            this._ownerWritableStream = stream;
            stream._writer = this;
            const state = stream._state;
            if (state === "writable") {
              if (!WritableStreamCloseQueuedOrInFlight(stream) && stream._backpressure) {
                defaultWriterReadyPromiseInitialize(this);
              } else {
                defaultWriterReadyPromiseInitializeAsResolved(this);
              }
              defaultWriterClosedPromiseInitialize(this);
            } else if (state === "erroring") {
              defaultWriterReadyPromiseInitializeAsRejected(this, stream._storedError);
              defaultWriterClosedPromiseInitialize(this);
            } else if (state === "closed") {
              defaultWriterReadyPromiseInitializeAsResolved(this);
              defaultWriterClosedPromiseInitializeAsResolved(this);
            } else {
              const storedError = stream._storedError;
              defaultWriterReadyPromiseInitializeAsRejected(this, storedError);
              defaultWriterClosedPromiseInitializeAsRejected(this, storedError);
            }
          }
          get closed() {
            if (!IsWritableStreamDefaultWriter(this)) {
              return promiseRejectedWith(defaultWriterBrandCheckException("closed"));
            }
            return this._closedPromise;
          }
          get desiredSize() {
            if (!IsWritableStreamDefaultWriter(this)) {
              throw defaultWriterBrandCheckException("desiredSize");
            }
            if (this._ownerWritableStream === void 0) {
              throw defaultWriterLockException("desiredSize");
            }
            return WritableStreamDefaultWriterGetDesiredSize(this);
          }
          get ready() {
            if (!IsWritableStreamDefaultWriter(this)) {
              return promiseRejectedWith(defaultWriterBrandCheckException("ready"));
            }
            return this._readyPromise;
          }
          abort(reason = void 0) {
            if (!IsWritableStreamDefaultWriter(this)) {
              return promiseRejectedWith(defaultWriterBrandCheckException("abort"));
            }
            if (this._ownerWritableStream === void 0) {
              return promiseRejectedWith(defaultWriterLockException("abort"));
            }
            return WritableStreamDefaultWriterAbort(this, reason);
          }
          close() {
            if (!IsWritableStreamDefaultWriter(this)) {
              return promiseRejectedWith(defaultWriterBrandCheckException("close"));
            }
            const stream = this._ownerWritableStream;
            if (stream === void 0) {
              return promiseRejectedWith(defaultWriterLockException("close"));
            }
            if (WritableStreamCloseQueuedOrInFlight(stream)) {
              return promiseRejectedWith(new TypeError("Cannot close an already-closing stream"));
            }
            return WritableStreamDefaultWriterClose(this);
          }
          releaseLock() {
            if (!IsWritableStreamDefaultWriter(this)) {
              throw defaultWriterBrandCheckException("releaseLock");
            }
            const stream = this._ownerWritableStream;
            if (stream === void 0) {
              return;
            }
            WritableStreamDefaultWriterRelease(this);
          }
          write(chunk = void 0) {
            if (!IsWritableStreamDefaultWriter(this)) {
              return promiseRejectedWith(defaultWriterBrandCheckException("write"));
            }
            if (this._ownerWritableStream === void 0) {
              return promiseRejectedWith(defaultWriterLockException("write to"));
            }
            return WritableStreamDefaultWriterWrite(this, chunk);
          }
        }
        Object.defineProperties(WritableStreamDefaultWriter.prototype, {
          abort: { enumerable: true },
          close: { enumerable: true },
          releaseLock: { enumerable: true },
          write: { enumerable: true },
          closed: { enumerable: true },
          desiredSize: { enumerable: true },
          ready: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(WritableStreamDefaultWriter.prototype, SymbolPolyfill.toStringTag, {
            value: "WritableStreamDefaultWriter",
            configurable: true
          });
        }
        function IsWritableStreamDefaultWriter(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_ownerWritableStream")) {
            return false;
          }
          return x2 instanceof WritableStreamDefaultWriter;
        }
        function WritableStreamDefaultWriterAbort(writer, reason) {
          const stream = writer._ownerWritableStream;
          return WritableStreamAbort(stream, reason);
        }
        function WritableStreamDefaultWriterClose(writer) {
          const stream = writer._ownerWritableStream;
          return WritableStreamClose(stream);
        }
        function WritableStreamDefaultWriterCloseWithErrorPropagation(writer) {
          const stream = writer._ownerWritableStream;
          const state = stream._state;
          if (WritableStreamCloseQueuedOrInFlight(stream) || state === "closed") {
            return promiseResolvedWith(void 0);
          }
          if (state === "errored") {
            return promiseRejectedWith(stream._storedError);
          }
          return WritableStreamDefaultWriterClose(writer);
        }
        function WritableStreamDefaultWriterEnsureClosedPromiseRejected(writer, error2) {
          if (writer._closedPromiseState === "pending") {
            defaultWriterClosedPromiseReject(writer, error2);
          } else {
            defaultWriterClosedPromiseResetToRejected(writer, error2);
          }
        }
        function WritableStreamDefaultWriterEnsureReadyPromiseRejected(writer, error2) {
          if (writer._readyPromiseState === "pending") {
            defaultWriterReadyPromiseReject(writer, error2);
          } else {
            defaultWriterReadyPromiseResetToRejected(writer, error2);
          }
        }
        function WritableStreamDefaultWriterGetDesiredSize(writer) {
          const stream = writer._ownerWritableStream;
          const state = stream._state;
          if (state === "errored" || state === "erroring") {
            return null;
          }
          if (state === "closed") {
            return 0;
          }
          return WritableStreamDefaultControllerGetDesiredSize(stream._writableStreamController);
        }
        function WritableStreamDefaultWriterRelease(writer) {
          const stream = writer._ownerWritableStream;
          const releasedError = new TypeError(`Writer was released and can no longer be used to monitor the stream's closedness`);
          WritableStreamDefaultWriterEnsureReadyPromiseRejected(writer, releasedError);
          WritableStreamDefaultWriterEnsureClosedPromiseRejected(writer, releasedError);
          stream._writer = void 0;
          writer._ownerWritableStream = void 0;
        }
        function WritableStreamDefaultWriterWrite(writer, chunk) {
          const stream = writer._ownerWritableStream;
          const controller = stream._writableStreamController;
          const chunkSize = WritableStreamDefaultControllerGetChunkSize(controller, chunk);
          if (stream !== writer._ownerWritableStream) {
            return promiseRejectedWith(defaultWriterLockException("write to"));
          }
          const state = stream._state;
          if (state === "errored") {
            return promiseRejectedWith(stream._storedError);
          }
          if (WritableStreamCloseQueuedOrInFlight(stream) || state === "closed") {
            return promiseRejectedWith(new TypeError("The stream is closing or closed and cannot be written to"));
          }
          if (state === "erroring") {
            return promiseRejectedWith(stream._storedError);
          }
          const promise = WritableStreamAddWriteRequest(stream);
          WritableStreamDefaultControllerWrite(controller, chunk, chunkSize);
          return promise;
        }
        const closeSentinel = {};
        class WritableStreamDefaultController {
          constructor() {
            throw new TypeError("Illegal constructor");
          }
          get abortReason() {
            if (!IsWritableStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException$2("abortReason");
            }
            return this._abortReason;
          }
          get signal() {
            if (!IsWritableStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException$2("signal");
            }
            if (this._abortController === void 0) {
              throw new TypeError("WritableStreamDefaultController.prototype.signal is not supported");
            }
            return this._abortController.signal;
          }
          error(e2 = void 0) {
            if (!IsWritableStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException$2("error");
            }
            const state = this._controlledWritableStream._state;
            if (state !== "writable") {
              return;
            }
            WritableStreamDefaultControllerError(this, e2);
          }
          [AbortSteps](reason) {
            const result = this._abortAlgorithm(reason);
            WritableStreamDefaultControllerClearAlgorithms(this);
            return result;
          }
          [ErrorSteps]() {
            ResetQueue(this);
          }
        }
        Object.defineProperties(WritableStreamDefaultController.prototype, {
          abortReason: { enumerable: true },
          signal: { enumerable: true },
          error: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(WritableStreamDefaultController.prototype, SymbolPolyfill.toStringTag, {
            value: "WritableStreamDefaultController",
            configurable: true
          });
        }
        function IsWritableStreamDefaultController(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_controlledWritableStream")) {
            return false;
          }
          return x2 instanceof WritableStreamDefaultController;
        }
        function SetUpWritableStreamDefaultController(stream, controller, startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, highWaterMark, sizeAlgorithm) {
          controller._controlledWritableStream = stream;
          stream._writableStreamController = controller;
          controller._queue = void 0;
          controller._queueTotalSize = void 0;
          ResetQueue(controller);
          controller._abortReason = void 0;
          controller._abortController = createAbortController();
          controller._started = false;
          controller._strategySizeAlgorithm = sizeAlgorithm;
          controller._strategyHWM = highWaterMark;
          controller._writeAlgorithm = writeAlgorithm;
          controller._closeAlgorithm = closeAlgorithm;
          controller._abortAlgorithm = abortAlgorithm;
          const backpressure = WritableStreamDefaultControllerGetBackpressure(controller);
          WritableStreamUpdateBackpressure(stream, backpressure);
          const startResult = startAlgorithm();
          const startPromise = promiseResolvedWith(startResult);
          uponPromise(startPromise, () => {
            controller._started = true;
            WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller);
          }, (r2) => {
            controller._started = true;
            WritableStreamDealWithRejection(stream, r2);
          });
        }
        function SetUpWritableStreamDefaultControllerFromUnderlyingSink(stream, underlyingSink, highWaterMark, sizeAlgorithm) {
          const controller = Object.create(WritableStreamDefaultController.prototype);
          let startAlgorithm = () => void 0;
          let writeAlgorithm = () => promiseResolvedWith(void 0);
          let closeAlgorithm = () => promiseResolvedWith(void 0);
          let abortAlgorithm = () => promiseResolvedWith(void 0);
          if (underlyingSink.start !== void 0) {
            startAlgorithm = () => underlyingSink.start(controller);
          }
          if (underlyingSink.write !== void 0) {
            writeAlgorithm = (chunk) => underlyingSink.write(chunk, controller);
          }
          if (underlyingSink.close !== void 0) {
            closeAlgorithm = () => underlyingSink.close();
          }
          if (underlyingSink.abort !== void 0) {
            abortAlgorithm = (reason) => underlyingSink.abort(reason);
          }
          SetUpWritableStreamDefaultController(stream, controller, startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, highWaterMark, sizeAlgorithm);
        }
        function WritableStreamDefaultControllerClearAlgorithms(controller) {
          controller._writeAlgorithm = void 0;
          controller._closeAlgorithm = void 0;
          controller._abortAlgorithm = void 0;
          controller._strategySizeAlgorithm = void 0;
        }
        function WritableStreamDefaultControllerClose(controller) {
          EnqueueValueWithSize(controller, closeSentinel, 0);
          WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller);
        }
        function WritableStreamDefaultControllerGetChunkSize(controller, chunk) {
          try {
            return controller._strategySizeAlgorithm(chunk);
          } catch (chunkSizeE) {
            WritableStreamDefaultControllerErrorIfNeeded(controller, chunkSizeE);
            return 1;
          }
        }
        function WritableStreamDefaultControllerGetDesiredSize(controller) {
          return controller._strategyHWM - controller._queueTotalSize;
        }
        function WritableStreamDefaultControllerWrite(controller, chunk, chunkSize) {
          try {
            EnqueueValueWithSize(controller, chunk, chunkSize);
          } catch (enqueueE) {
            WritableStreamDefaultControllerErrorIfNeeded(controller, enqueueE);
            return;
          }
          const stream = controller._controlledWritableStream;
          if (!WritableStreamCloseQueuedOrInFlight(stream) && stream._state === "writable") {
            const backpressure = WritableStreamDefaultControllerGetBackpressure(controller);
            WritableStreamUpdateBackpressure(stream, backpressure);
          }
          WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller);
        }
        function WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller) {
          const stream = controller._controlledWritableStream;
          if (!controller._started) {
            return;
          }
          if (stream._inFlightWriteRequest !== void 0) {
            return;
          }
          const state = stream._state;
          if (state === "erroring") {
            WritableStreamFinishErroring(stream);
            return;
          }
          if (controller._queue.length === 0) {
            return;
          }
          const value = PeekQueueValue(controller);
          if (value === closeSentinel) {
            WritableStreamDefaultControllerProcessClose(controller);
          } else {
            WritableStreamDefaultControllerProcessWrite(controller, value);
          }
        }
        function WritableStreamDefaultControllerErrorIfNeeded(controller, error2) {
          if (controller._controlledWritableStream._state === "writable") {
            WritableStreamDefaultControllerError(controller, error2);
          }
        }
        function WritableStreamDefaultControllerProcessClose(controller) {
          const stream = controller._controlledWritableStream;
          WritableStreamMarkCloseRequestInFlight(stream);
          DequeueValue(controller);
          const sinkClosePromise = controller._closeAlgorithm();
          WritableStreamDefaultControllerClearAlgorithms(controller);
          uponPromise(sinkClosePromise, () => {
            WritableStreamFinishInFlightClose(stream);
          }, (reason) => {
            WritableStreamFinishInFlightCloseWithError(stream, reason);
          });
        }
        function WritableStreamDefaultControllerProcessWrite(controller, chunk) {
          const stream = controller._controlledWritableStream;
          WritableStreamMarkFirstWriteRequestInFlight(stream);
          const sinkWritePromise = controller._writeAlgorithm(chunk);
          uponPromise(sinkWritePromise, () => {
            WritableStreamFinishInFlightWrite(stream);
            const state = stream._state;
            DequeueValue(controller);
            if (!WritableStreamCloseQueuedOrInFlight(stream) && state === "writable") {
              const backpressure = WritableStreamDefaultControllerGetBackpressure(controller);
              WritableStreamUpdateBackpressure(stream, backpressure);
            }
            WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller);
          }, (reason) => {
            if (stream._state === "writable") {
              WritableStreamDefaultControllerClearAlgorithms(controller);
            }
            WritableStreamFinishInFlightWriteWithError(stream, reason);
          });
        }
        function WritableStreamDefaultControllerGetBackpressure(controller) {
          const desiredSize = WritableStreamDefaultControllerGetDesiredSize(controller);
          return desiredSize <= 0;
        }
        function WritableStreamDefaultControllerError(controller, error2) {
          const stream = controller._controlledWritableStream;
          WritableStreamDefaultControllerClearAlgorithms(controller);
          WritableStreamStartErroring(stream, error2);
        }
        function streamBrandCheckException$2(name) {
          return new TypeError(`WritableStream.prototype.${name} can only be used on a WritableStream`);
        }
        function defaultControllerBrandCheckException$2(name) {
          return new TypeError(`WritableStreamDefaultController.prototype.${name} can only be used on a WritableStreamDefaultController`);
        }
        function defaultWriterBrandCheckException(name) {
          return new TypeError(`WritableStreamDefaultWriter.prototype.${name} can only be used on a WritableStreamDefaultWriter`);
        }
        function defaultWriterLockException(name) {
          return new TypeError("Cannot " + name + " a stream using a released writer");
        }
        function defaultWriterClosedPromiseInitialize(writer) {
          writer._closedPromise = newPromise((resolve2, reject) => {
            writer._closedPromise_resolve = resolve2;
            writer._closedPromise_reject = reject;
            writer._closedPromiseState = "pending";
          });
        }
        function defaultWriterClosedPromiseInitializeAsRejected(writer, reason) {
          defaultWriterClosedPromiseInitialize(writer);
          defaultWriterClosedPromiseReject(writer, reason);
        }
        function defaultWriterClosedPromiseInitializeAsResolved(writer) {
          defaultWriterClosedPromiseInitialize(writer);
          defaultWriterClosedPromiseResolve(writer);
        }
        function defaultWriterClosedPromiseReject(writer, reason) {
          if (writer._closedPromise_reject === void 0) {
            return;
          }
          setPromiseIsHandledToTrue(writer._closedPromise);
          writer._closedPromise_reject(reason);
          writer._closedPromise_resolve = void 0;
          writer._closedPromise_reject = void 0;
          writer._closedPromiseState = "rejected";
        }
        function defaultWriterClosedPromiseResetToRejected(writer, reason) {
          defaultWriterClosedPromiseInitializeAsRejected(writer, reason);
        }
        function defaultWriterClosedPromiseResolve(writer) {
          if (writer._closedPromise_resolve === void 0) {
            return;
          }
          writer._closedPromise_resolve(void 0);
          writer._closedPromise_resolve = void 0;
          writer._closedPromise_reject = void 0;
          writer._closedPromiseState = "resolved";
        }
        function defaultWriterReadyPromiseInitialize(writer) {
          writer._readyPromise = newPromise((resolve2, reject) => {
            writer._readyPromise_resolve = resolve2;
            writer._readyPromise_reject = reject;
          });
          writer._readyPromiseState = "pending";
        }
        function defaultWriterReadyPromiseInitializeAsRejected(writer, reason) {
          defaultWriterReadyPromiseInitialize(writer);
          defaultWriterReadyPromiseReject(writer, reason);
        }
        function defaultWriterReadyPromiseInitializeAsResolved(writer) {
          defaultWriterReadyPromiseInitialize(writer);
          defaultWriterReadyPromiseResolve(writer);
        }
        function defaultWriterReadyPromiseReject(writer, reason) {
          if (writer._readyPromise_reject === void 0) {
            return;
          }
          setPromiseIsHandledToTrue(writer._readyPromise);
          writer._readyPromise_reject(reason);
          writer._readyPromise_resolve = void 0;
          writer._readyPromise_reject = void 0;
          writer._readyPromiseState = "rejected";
        }
        function defaultWriterReadyPromiseReset(writer) {
          defaultWriterReadyPromiseInitialize(writer);
        }
        function defaultWriterReadyPromiseResetToRejected(writer, reason) {
          defaultWriterReadyPromiseInitializeAsRejected(writer, reason);
        }
        function defaultWriterReadyPromiseResolve(writer) {
          if (writer._readyPromise_resolve === void 0) {
            return;
          }
          writer._readyPromise_resolve(void 0);
          writer._readyPromise_resolve = void 0;
          writer._readyPromise_reject = void 0;
          writer._readyPromiseState = "fulfilled";
        }
        const NativeDOMException = typeof DOMException !== "undefined" ? DOMException : void 0;
        function isDOMExceptionConstructor(ctor) {
          if (!(typeof ctor === "function" || typeof ctor === "object")) {
            return false;
          }
          try {
            new ctor();
            return true;
          } catch (_a4) {
            return false;
          }
        }
        function createDOMExceptionPolyfill() {
          const ctor = function DOMException2(message, name) {
            this.message = message || "";
            this.name = name || "Error";
            if (Error.captureStackTrace) {
              Error.captureStackTrace(this, this.constructor);
            }
          };
          ctor.prototype = Object.create(Error.prototype);
          Object.defineProperty(ctor.prototype, "constructor", { value: ctor, writable: true, configurable: true });
          return ctor;
        }
        const DOMException$1 = isDOMExceptionConstructor(NativeDOMException) ? NativeDOMException : createDOMExceptionPolyfill();
        function ReadableStreamPipeTo(source, dest, preventClose, preventAbort, preventCancel, signal) {
          const reader = AcquireReadableStreamDefaultReader(source);
          const writer = AcquireWritableStreamDefaultWriter(dest);
          source._disturbed = true;
          let shuttingDown = false;
          let currentWrite = promiseResolvedWith(void 0);
          return newPromise((resolve2, reject) => {
            let abortAlgorithm;
            if (signal !== void 0) {
              abortAlgorithm = () => {
                const error2 = new DOMException$1("Aborted", "AbortError");
                const actions = [];
                if (!preventAbort) {
                  actions.push(() => {
                    if (dest._state === "writable") {
                      return WritableStreamAbort(dest, error2);
                    }
                    return promiseResolvedWith(void 0);
                  });
                }
                if (!preventCancel) {
                  actions.push(() => {
                    if (source._state === "readable") {
                      return ReadableStreamCancel(source, error2);
                    }
                    return promiseResolvedWith(void 0);
                  });
                }
                shutdownWithAction(() => Promise.all(actions.map((action) => action())), true, error2);
              };
              if (signal.aborted) {
                abortAlgorithm();
                return;
              }
              signal.addEventListener("abort", abortAlgorithm);
            }
            function pipeLoop() {
              return newPromise((resolveLoop, rejectLoop) => {
                function next(done) {
                  if (done) {
                    resolveLoop();
                  } else {
                    PerformPromiseThen(pipeStep(), next, rejectLoop);
                  }
                }
                next(false);
              });
            }
            function pipeStep() {
              if (shuttingDown) {
                return promiseResolvedWith(true);
              }
              return PerformPromiseThen(writer._readyPromise, () => {
                return newPromise((resolveRead, rejectRead) => {
                  ReadableStreamDefaultReaderRead(reader, {
                    _chunkSteps: (chunk) => {
                      currentWrite = PerformPromiseThen(WritableStreamDefaultWriterWrite(writer, chunk), void 0, noop3);
                      resolveRead(false);
                    },
                    _closeSteps: () => resolveRead(true),
                    _errorSteps: rejectRead
                  });
                });
              });
            }
            isOrBecomesErrored(source, reader._closedPromise, (storedError) => {
              if (!preventAbort) {
                shutdownWithAction(() => WritableStreamAbort(dest, storedError), true, storedError);
              } else {
                shutdown(true, storedError);
              }
            });
            isOrBecomesErrored(dest, writer._closedPromise, (storedError) => {
              if (!preventCancel) {
                shutdownWithAction(() => ReadableStreamCancel(source, storedError), true, storedError);
              } else {
                shutdown(true, storedError);
              }
            });
            isOrBecomesClosed(source, reader._closedPromise, () => {
              if (!preventClose) {
                shutdownWithAction(() => WritableStreamDefaultWriterCloseWithErrorPropagation(writer));
              } else {
                shutdown();
              }
            });
            if (WritableStreamCloseQueuedOrInFlight(dest) || dest._state === "closed") {
              const destClosed = new TypeError("the destination writable stream closed before all data could be piped to it");
              if (!preventCancel) {
                shutdownWithAction(() => ReadableStreamCancel(source, destClosed), true, destClosed);
              } else {
                shutdown(true, destClosed);
              }
            }
            setPromiseIsHandledToTrue(pipeLoop());
            function waitForWritesToFinish() {
              const oldCurrentWrite = currentWrite;
              return PerformPromiseThen(currentWrite, () => oldCurrentWrite !== currentWrite ? waitForWritesToFinish() : void 0);
            }
            function isOrBecomesErrored(stream, promise, action) {
              if (stream._state === "errored") {
                action(stream._storedError);
              } else {
                uponRejection(promise, action);
              }
            }
            function isOrBecomesClosed(stream, promise, action) {
              if (stream._state === "closed") {
                action();
              } else {
                uponFulfillment(promise, action);
              }
            }
            function shutdownWithAction(action, originalIsError, originalError) {
              if (shuttingDown) {
                return;
              }
              shuttingDown = true;
              if (dest._state === "writable" && !WritableStreamCloseQueuedOrInFlight(dest)) {
                uponFulfillment(waitForWritesToFinish(), doTheRest);
              } else {
                doTheRest();
              }
              function doTheRest() {
                uponPromise(action(), () => finalize(originalIsError, originalError), (newError) => finalize(true, newError));
              }
            }
            function shutdown(isError, error2) {
              if (shuttingDown) {
                return;
              }
              shuttingDown = true;
              if (dest._state === "writable" && !WritableStreamCloseQueuedOrInFlight(dest)) {
                uponFulfillment(waitForWritesToFinish(), () => finalize(isError, error2));
              } else {
                finalize(isError, error2);
              }
            }
            function finalize(isError, error2) {
              WritableStreamDefaultWriterRelease(writer);
              ReadableStreamReaderGenericRelease(reader);
              if (signal !== void 0) {
                signal.removeEventListener("abort", abortAlgorithm);
              }
              if (isError) {
                reject(error2);
              } else {
                resolve2(void 0);
              }
            }
          });
        }
        class ReadableStreamDefaultController {
          constructor() {
            throw new TypeError("Illegal constructor");
          }
          get desiredSize() {
            if (!IsReadableStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException$1("desiredSize");
            }
            return ReadableStreamDefaultControllerGetDesiredSize(this);
          }
          close() {
            if (!IsReadableStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException$1("close");
            }
            if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(this)) {
              throw new TypeError("The stream is not in a state that permits close");
            }
            ReadableStreamDefaultControllerClose(this);
          }
          enqueue(chunk = void 0) {
            if (!IsReadableStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException$1("enqueue");
            }
            if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(this)) {
              throw new TypeError("The stream is not in a state that permits enqueue");
            }
            return ReadableStreamDefaultControllerEnqueue(this, chunk);
          }
          error(e2 = void 0) {
            if (!IsReadableStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException$1("error");
            }
            ReadableStreamDefaultControllerError(this, e2);
          }
          [CancelSteps](reason) {
            ResetQueue(this);
            const result = this._cancelAlgorithm(reason);
            ReadableStreamDefaultControllerClearAlgorithms(this);
            return result;
          }
          [PullSteps](readRequest) {
            const stream = this._controlledReadableStream;
            if (this._queue.length > 0) {
              const chunk = DequeueValue(this);
              if (this._closeRequested && this._queue.length === 0) {
                ReadableStreamDefaultControllerClearAlgorithms(this);
                ReadableStreamClose(stream);
              } else {
                ReadableStreamDefaultControllerCallPullIfNeeded(this);
              }
              readRequest._chunkSteps(chunk);
            } else {
              ReadableStreamAddReadRequest(stream, readRequest);
              ReadableStreamDefaultControllerCallPullIfNeeded(this);
            }
          }
        }
        Object.defineProperties(ReadableStreamDefaultController.prototype, {
          close: { enumerable: true },
          enqueue: { enumerable: true },
          error: { enumerable: true },
          desiredSize: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(ReadableStreamDefaultController.prototype, SymbolPolyfill.toStringTag, {
            value: "ReadableStreamDefaultController",
            configurable: true
          });
        }
        function IsReadableStreamDefaultController(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_controlledReadableStream")) {
            return false;
          }
          return x2 instanceof ReadableStreamDefaultController;
        }
        function ReadableStreamDefaultControllerCallPullIfNeeded(controller) {
          const shouldPull = ReadableStreamDefaultControllerShouldCallPull(controller);
          if (!shouldPull) {
            return;
          }
          if (controller._pulling) {
            controller._pullAgain = true;
            return;
          }
          controller._pulling = true;
          const pullPromise = controller._pullAlgorithm();
          uponPromise(pullPromise, () => {
            controller._pulling = false;
            if (controller._pullAgain) {
              controller._pullAgain = false;
              ReadableStreamDefaultControllerCallPullIfNeeded(controller);
            }
          }, (e2) => {
            ReadableStreamDefaultControllerError(controller, e2);
          });
        }
        function ReadableStreamDefaultControllerShouldCallPull(controller) {
          const stream = controller._controlledReadableStream;
          if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(controller)) {
            return false;
          }
          if (!controller._started) {
            return false;
          }
          if (IsReadableStreamLocked(stream) && ReadableStreamGetNumReadRequests(stream) > 0) {
            return true;
          }
          const desiredSize = ReadableStreamDefaultControllerGetDesiredSize(controller);
          if (desiredSize > 0) {
            return true;
          }
          return false;
        }
        function ReadableStreamDefaultControllerClearAlgorithms(controller) {
          controller._pullAlgorithm = void 0;
          controller._cancelAlgorithm = void 0;
          controller._strategySizeAlgorithm = void 0;
        }
        function ReadableStreamDefaultControllerClose(controller) {
          if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(controller)) {
            return;
          }
          const stream = controller._controlledReadableStream;
          controller._closeRequested = true;
          if (controller._queue.length === 0) {
            ReadableStreamDefaultControllerClearAlgorithms(controller);
            ReadableStreamClose(stream);
          }
        }
        function ReadableStreamDefaultControllerEnqueue(controller, chunk) {
          if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(controller)) {
            return;
          }
          const stream = controller._controlledReadableStream;
          if (IsReadableStreamLocked(stream) && ReadableStreamGetNumReadRequests(stream) > 0) {
            ReadableStreamFulfillReadRequest(stream, chunk, false);
          } else {
            let chunkSize;
            try {
              chunkSize = controller._strategySizeAlgorithm(chunk);
            } catch (chunkSizeE) {
              ReadableStreamDefaultControllerError(controller, chunkSizeE);
              throw chunkSizeE;
            }
            try {
              EnqueueValueWithSize(controller, chunk, chunkSize);
            } catch (enqueueE) {
              ReadableStreamDefaultControllerError(controller, enqueueE);
              throw enqueueE;
            }
          }
          ReadableStreamDefaultControllerCallPullIfNeeded(controller);
        }
        function ReadableStreamDefaultControllerError(controller, e2) {
          const stream = controller._controlledReadableStream;
          if (stream._state !== "readable") {
            return;
          }
          ResetQueue(controller);
          ReadableStreamDefaultControllerClearAlgorithms(controller);
          ReadableStreamError(stream, e2);
        }
        function ReadableStreamDefaultControllerGetDesiredSize(controller) {
          const state = controller._controlledReadableStream._state;
          if (state === "errored") {
            return null;
          }
          if (state === "closed") {
            return 0;
          }
          return controller._strategyHWM - controller._queueTotalSize;
        }
        function ReadableStreamDefaultControllerHasBackpressure(controller) {
          if (ReadableStreamDefaultControllerShouldCallPull(controller)) {
            return false;
          }
          return true;
        }
        function ReadableStreamDefaultControllerCanCloseOrEnqueue(controller) {
          const state = controller._controlledReadableStream._state;
          if (!controller._closeRequested && state === "readable") {
            return true;
          }
          return false;
        }
        function SetUpReadableStreamDefaultController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, sizeAlgorithm) {
          controller._controlledReadableStream = stream;
          controller._queue = void 0;
          controller._queueTotalSize = void 0;
          ResetQueue(controller);
          controller._started = false;
          controller._closeRequested = false;
          controller._pullAgain = false;
          controller._pulling = false;
          controller._strategySizeAlgorithm = sizeAlgorithm;
          controller._strategyHWM = highWaterMark;
          controller._pullAlgorithm = pullAlgorithm;
          controller._cancelAlgorithm = cancelAlgorithm;
          stream._readableStreamController = controller;
          const startResult = startAlgorithm();
          uponPromise(promiseResolvedWith(startResult), () => {
            controller._started = true;
            ReadableStreamDefaultControllerCallPullIfNeeded(controller);
          }, (r2) => {
            ReadableStreamDefaultControllerError(controller, r2);
          });
        }
        function SetUpReadableStreamDefaultControllerFromUnderlyingSource(stream, underlyingSource, highWaterMark, sizeAlgorithm) {
          const controller = Object.create(ReadableStreamDefaultController.prototype);
          let startAlgorithm = () => void 0;
          let pullAlgorithm = () => promiseResolvedWith(void 0);
          let cancelAlgorithm = () => promiseResolvedWith(void 0);
          if (underlyingSource.start !== void 0) {
            startAlgorithm = () => underlyingSource.start(controller);
          }
          if (underlyingSource.pull !== void 0) {
            pullAlgorithm = () => underlyingSource.pull(controller);
          }
          if (underlyingSource.cancel !== void 0) {
            cancelAlgorithm = (reason) => underlyingSource.cancel(reason);
          }
          SetUpReadableStreamDefaultController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, sizeAlgorithm);
        }
        function defaultControllerBrandCheckException$1(name) {
          return new TypeError(`ReadableStreamDefaultController.prototype.${name} can only be used on a ReadableStreamDefaultController`);
        }
        function ReadableStreamTee(stream, cloneForBranch2) {
          if (IsReadableByteStreamController(stream._readableStreamController)) {
            return ReadableByteStreamTee(stream);
          }
          return ReadableStreamDefaultTee(stream);
        }
        function ReadableStreamDefaultTee(stream, cloneForBranch2) {
          const reader = AcquireReadableStreamDefaultReader(stream);
          let reading = false;
          let readAgain = false;
          let canceled1 = false;
          let canceled2 = false;
          let reason1;
          let reason2;
          let branch1;
          let branch2;
          let resolveCancelPromise;
          const cancelPromise = newPromise((resolve2) => {
            resolveCancelPromise = resolve2;
          });
          function pullAlgorithm() {
            if (reading) {
              readAgain = true;
              return promiseResolvedWith(void 0);
            }
            reading = true;
            const readRequest = {
              _chunkSteps: (chunk) => {
                queueMicrotask(() => {
                  readAgain = false;
                  const chunk1 = chunk;
                  const chunk2 = chunk;
                  if (!canceled1) {
                    ReadableStreamDefaultControllerEnqueue(branch1._readableStreamController, chunk1);
                  }
                  if (!canceled2) {
                    ReadableStreamDefaultControllerEnqueue(branch2._readableStreamController, chunk2);
                  }
                  reading = false;
                  if (readAgain) {
                    pullAlgorithm();
                  }
                });
              },
              _closeSteps: () => {
                reading = false;
                if (!canceled1) {
                  ReadableStreamDefaultControllerClose(branch1._readableStreamController);
                }
                if (!canceled2) {
                  ReadableStreamDefaultControllerClose(branch2._readableStreamController);
                }
                if (!canceled1 || !canceled2) {
                  resolveCancelPromise(void 0);
                }
              },
              _errorSteps: () => {
                reading = false;
              }
            };
            ReadableStreamDefaultReaderRead(reader, readRequest);
            return promiseResolvedWith(void 0);
          }
          function cancel1Algorithm(reason) {
            canceled1 = true;
            reason1 = reason;
            if (canceled2) {
              const compositeReason = CreateArrayFromList([reason1, reason2]);
              const cancelResult = ReadableStreamCancel(stream, compositeReason);
              resolveCancelPromise(cancelResult);
            }
            return cancelPromise;
          }
          function cancel2Algorithm(reason) {
            canceled2 = true;
            reason2 = reason;
            if (canceled1) {
              const compositeReason = CreateArrayFromList([reason1, reason2]);
              const cancelResult = ReadableStreamCancel(stream, compositeReason);
              resolveCancelPromise(cancelResult);
            }
            return cancelPromise;
          }
          function startAlgorithm() {
          }
          branch1 = CreateReadableStream(startAlgorithm, pullAlgorithm, cancel1Algorithm);
          branch2 = CreateReadableStream(startAlgorithm, pullAlgorithm, cancel2Algorithm);
          uponRejection(reader._closedPromise, (r2) => {
            ReadableStreamDefaultControllerError(branch1._readableStreamController, r2);
            ReadableStreamDefaultControllerError(branch2._readableStreamController, r2);
            if (!canceled1 || !canceled2) {
              resolveCancelPromise(void 0);
            }
          });
          return [branch1, branch2];
        }
        function ReadableByteStreamTee(stream) {
          let reader = AcquireReadableStreamDefaultReader(stream);
          let reading = false;
          let readAgainForBranch1 = false;
          let readAgainForBranch2 = false;
          let canceled1 = false;
          let canceled2 = false;
          let reason1;
          let reason2;
          let branch1;
          let branch2;
          let resolveCancelPromise;
          const cancelPromise = newPromise((resolve2) => {
            resolveCancelPromise = resolve2;
          });
          function forwardReaderError(thisReader) {
            uponRejection(thisReader._closedPromise, (r2) => {
              if (thisReader !== reader) {
                return;
              }
              ReadableByteStreamControllerError(branch1._readableStreamController, r2);
              ReadableByteStreamControllerError(branch2._readableStreamController, r2);
              if (!canceled1 || !canceled2) {
                resolveCancelPromise(void 0);
              }
            });
          }
          function pullWithDefaultReader() {
            if (IsReadableStreamBYOBReader(reader)) {
              ReadableStreamReaderGenericRelease(reader);
              reader = AcquireReadableStreamDefaultReader(stream);
              forwardReaderError(reader);
            }
            const readRequest = {
              _chunkSteps: (chunk) => {
                queueMicrotask(() => {
                  readAgainForBranch1 = false;
                  readAgainForBranch2 = false;
                  const chunk1 = chunk;
                  let chunk2 = chunk;
                  if (!canceled1 && !canceled2) {
                    try {
                      chunk2 = CloneAsUint8Array(chunk);
                    } catch (cloneE) {
                      ReadableByteStreamControllerError(branch1._readableStreamController, cloneE);
                      ReadableByteStreamControllerError(branch2._readableStreamController, cloneE);
                      resolveCancelPromise(ReadableStreamCancel(stream, cloneE));
                      return;
                    }
                  }
                  if (!canceled1) {
                    ReadableByteStreamControllerEnqueue(branch1._readableStreamController, chunk1);
                  }
                  if (!canceled2) {
                    ReadableByteStreamControllerEnqueue(branch2._readableStreamController, chunk2);
                  }
                  reading = false;
                  if (readAgainForBranch1) {
                    pull1Algorithm();
                  } else if (readAgainForBranch2) {
                    pull2Algorithm();
                  }
                });
              },
              _closeSteps: () => {
                reading = false;
                if (!canceled1) {
                  ReadableByteStreamControllerClose(branch1._readableStreamController);
                }
                if (!canceled2) {
                  ReadableByteStreamControllerClose(branch2._readableStreamController);
                }
                if (branch1._readableStreamController._pendingPullIntos.length > 0) {
                  ReadableByteStreamControllerRespond(branch1._readableStreamController, 0);
                }
                if (branch2._readableStreamController._pendingPullIntos.length > 0) {
                  ReadableByteStreamControllerRespond(branch2._readableStreamController, 0);
                }
                if (!canceled1 || !canceled2) {
                  resolveCancelPromise(void 0);
                }
              },
              _errorSteps: () => {
                reading = false;
              }
            };
            ReadableStreamDefaultReaderRead(reader, readRequest);
          }
          function pullWithBYOBReader(view, forBranch2) {
            if (IsReadableStreamDefaultReader(reader)) {
              ReadableStreamReaderGenericRelease(reader);
              reader = AcquireReadableStreamBYOBReader(stream);
              forwardReaderError(reader);
            }
            const byobBranch = forBranch2 ? branch2 : branch1;
            const otherBranch = forBranch2 ? branch1 : branch2;
            const readIntoRequest = {
              _chunkSteps: (chunk) => {
                queueMicrotask(() => {
                  readAgainForBranch1 = false;
                  readAgainForBranch2 = false;
                  const byobCanceled = forBranch2 ? canceled2 : canceled1;
                  const otherCanceled = forBranch2 ? canceled1 : canceled2;
                  if (!otherCanceled) {
                    let clonedChunk;
                    try {
                      clonedChunk = CloneAsUint8Array(chunk);
                    } catch (cloneE) {
                      ReadableByteStreamControllerError(byobBranch._readableStreamController, cloneE);
                      ReadableByteStreamControllerError(otherBranch._readableStreamController, cloneE);
                      resolveCancelPromise(ReadableStreamCancel(stream, cloneE));
                      return;
                    }
                    if (!byobCanceled) {
                      ReadableByteStreamControllerRespondWithNewView(byobBranch._readableStreamController, chunk);
                    }
                    ReadableByteStreamControllerEnqueue(otherBranch._readableStreamController, clonedChunk);
                  } else if (!byobCanceled) {
                    ReadableByteStreamControllerRespondWithNewView(byobBranch._readableStreamController, chunk);
                  }
                  reading = false;
                  if (readAgainForBranch1) {
                    pull1Algorithm();
                  } else if (readAgainForBranch2) {
                    pull2Algorithm();
                  }
                });
              },
              _closeSteps: (chunk) => {
                reading = false;
                const byobCanceled = forBranch2 ? canceled2 : canceled1;
                const otherCanceled = forBranch2 ? canceled1 : canceled2;
                if (!byobCanceled) {
                  ReadableByteStreamControllerClose(byobBranch._readableStreamController);
                }
                if (!otherCanceled) {
                  ReadableByteStreamControllerClose(otherBranch._readableStreamController);
                }
                if (chunk !== void 0) {
                  if (!byobCanceled) {
                    ReadableByteStreamControllerRespondWithNewView(byobBranch._readableStreamController, chunk);
                  }
                  if (!otherCanceled && otherBranch._readableStreamController._pendingPullIntos.length > 0) {
                    ReadableByteStreamControllerRespond(otherBranch._readableStreamController, 0);
                  }
                }
                if (!byobCanceled || !otherCanceled) {
                  resolveCancelPromise(void 0);
                }
              },
              _errorSteps: () => {
                reading = false;
              }
            };
            ReadableStreamBYOBReaderRead(reader, view, readIntoRequest);
          }
          function pull1Algorithm() {
            if (reading) {
              readAgainForBranch1 = true;
              return promiseResolvedWith(void 0);
            }
            reading = true;
            const byobRequest = ReadableByteStreamControllerGetBYOBRequest(branch1._readableStreamController);
            if (byobRequest === null) {
              pullWithDefaultReader();
            } else {
              pullWithBYOBReader(byobRequest._view, false);
            }
            return promiseResolvedWith(void 0);
          }
          function pull2Algorithm() {
            if (reading) {
              readAgainForBranch2 = true;
              return promiseResolvedWith(void 0);
            }
            reading = true;
            const byobRequest = ReadableByteStreamControllerGetBYOBRequest(branch2._readableStreamController);
            if (byobRequest === null) {
              pullWithDefaultReader();
            } else {
              pullWithBYOBReader(byobRequest._view, true);
            }
            return promiseResolvedWith(void 0);
          }
          function cancel1Algorithm(reason) {
            canceled1 = true;
            reason1 = reason;
            if (canceled2) {
              const compositeReason = CreateArrayFromList([reason1, reason2]);
              const cancelResult = ReadableStreamCancel(stream, compositeReason);
              resolveCancelPromise(cancelResult);
            }
            return cancelPromise;
          }
          function cancel2Algorithm(reason) {
            canceled2 = true;
            reason2 = reason;
            if (canceled1) {
              const compositeReason = CreateArrayFromList([reason1, reason2]);
              const cancelResult = ReadableStreamCancel(stream, compositeReason);
              resolveCancelPromise(cancelResult);
            }
            return cancelPromise;
          }
          function startAlgorithm() {
            return;
          }
          branch1 = CreateReadableByteStream(startAlgorithm, pull1Algorithm, cancel1Algorithm);
          branch2 = CreateReadableByteStream(startAlgorithm, pull2Algorithm, cancel2Algorithm);
          forwardReaderError(reader);
          return [branch1, branch2];
        }
        function convertUnderlyingDefaultOrByteSource(source, context) {
          assertDictionary(source, context);
          const original = source;
          const autoAllocateChunkSize = original === null || original === void 0 ? void 0 : original.autoAllocateChunkSize;
          const cancel = original === null || original === void 0 ? void 0 : original.cancel;
          const pull = original === null || original === void 0 ? void 0 : original.pull;
          const start = original === null || original === void 0 ? void 0 : original.start;
          const type = original === null || original === void 0 ? void 0 : original.type;
          return {
            autoAllocateChunkSize: autoAllocateChunkSize === void 0 ? void 0 : convertUnsignedLongLongWithEnforceRange(autoAllocateChunkSize, `${context} has member 'autoAllocateChunkSize' that`),
            cancel: cancel === void 0 ? void 0 : convertUnderlyingSourceCancelCallback(cancel, original, `${context} has member 'cancel' that`),
            pull: pull === void 0 ? void 0 : convertUnderlyingSourcePullCallback(pull, original, `${context} has member 'pull' that`),
            start: start === void 0 ? void 0 : convertUnderlyingSourceStartCallback(start, original, `${context} has member 'start' that`),
            type: type === void 0 ? void 0 : convertReadableStreamType(type, `${context} has member 'type' that`)
          };
        }
        function convertUnderlyingSourceCancelCallback(fn, original, context) {
          assertFunction(fn, context);
          return (reason) => promiseCall(fn, original, [reason]);
        }
        function convertUnderlyingSourcePullCallback(fn, original, context) {
          assertFunction(fn, context);
          return (controller) => promiseCall(fn, original, [controller]);
        }
        function convertUnderlyingSourceStartCallback(fn, original, context) {
          assertFunction(fn, context);
          return (controller) => reflectCall(fn, original, [controller]);
        }
        function convertReadableStreamType(type, context) {
          type = `${type}`;
          if (type !== "bytes") {
            throw new TypeError(`${context} '${type}' is not a valid enumeration value for ReadableStreamType`);
          }
          return type;
        }
        function convertReaderOptions(options, context) {
          assertDictionary(options, context);
          const mode = options === null || options === void 0 ? void 0 : options.mode;
          return {
            mode: mode === void 0 ? void 0 : convertReadableStreamReaderMode(mode, `${context} has member 'mode' that`)
          };
        }
        function convertReadableStreamReaderMode(mode, context) {
          mode = `${mode}`;
          if (mode !== "byob") {
            throw new TypeError(`${context} '${mode}' is not a valid enumeration value for ReadableStreamReaderMode`);
          }
          return mode;
        }
        function convertIteratorOptions(options, context) {
          assertDictionary(options, context);
          const preventCancel = options === null || options === void 0 ? void 0 : options.preventCancel;
          return { preventCancel: Boolean(preventCancel) };
        }
        function convertPipeOptions(options, context) {
          assertDictionary(options, context);
          const preventAbort = options === null || options === void 0 ? void 0 : options.preventAbort;
          const preventCancel = options === null || options === void 0 ? void 0 : options.preventCancel;
          const preventClose = options === null || options === void 0 ? void 0 : options.preventClose;
          const signal = options === null || options === void 0 ? void 0 : options.signal;
          if (signal !== void 0) {
            assertAbortSignal(signal, `${context} has member 'signal' that`);
          }
          return {
            preventAbort: Boolean(preventAbort),
            preventCancel: Boolean(preventCancel),
            preventClose: Boolean(preventClose),
            signal
          };
        }
        function assertAbortSignal(signal, context) {
          if (!isAbortSignal2(signal)) {
            throw new TypeError(`${context} is not an AbortSignal.`);
          }
        }
        function convertReadableWritablePair(pair, context) {
          assertDictionary(pair, context);
          const readable2 = pair === null || pair === void 0 ? void 0 : pair.readable;
          assertRequiredField(readable2, "readable", "ReadableWritablePair");
          assertReadableStream(readable2, `${context} has member 'readable' that`);
          const writable2 = pair === null || pair === void 0 ? void 0 : pair.writable;
          assertRequiredField(writable2, "writable", "ReadableWritablePair");
          assertWritableStream(writable2, `${context} has member 'writable' that`);
          return { readable: readable2, writable: writable2 };
        }
        class ReadableStream2 {
          constructor(rawUnderlyingSource = {}, rawStrategy = {}) {
            if (rawUnderlyingSource === void 0) {
              rawUnderlyingSource = null;
            } else {
              assertObject(rawUnderlyingSource, "First parameter");
            }
            const strategy = convertQueuingStrategy(rawStrategy, "Second parameter");
            const underlyingSource = convertUnderlyingDefaultOrByteSource(rawUnderlyingSource, "First parameter");
            InitializeReadableStream(this);
            if (underlyingSource.type === "bytes") {
              if (strategy.size !== void 0) {
                throw new RangeError("The strategy for a byte stream cannot have a size function");
              }
              const highWaterMark = ExtractHighWaterMark(strategy, 0);
              SetUpReadableByteStreamControllerFromUnderlyingSource(this, underlyingSource, highWaterMark);
            } else {
              const sizeAlgorithm = ExtractSizeAlgorithm(strategy);
              const highWaterMark = ExtractHighWaterMark(strategy, 1);
              SetUpReadableStreamDefaultControllerFromUnderlyingSource(this, underlyingSource, highWaterMark, sizeAlgorithm);
            }
          }
          get locked() {
            if (!IsReadableStream(this)) {
              throw streamBrandCheckException$1("locked");
            }
            return IsReadableStreamLocked(this);
          }
          cancel(reason = void 0) {
            if (!IsReadableStream(this)) {
              return promiseRejectedWith(streamBrandCheckException$1("cancel"));
            }
            if (IsReadableStreamLocked(this)) {
              return promiseRejectedWith(new TypeError("Cannot cancel a stream that already has a reader"));
            }
            return ReadableStreamCancel(this, reason);
          }
          getReader(rawOptions = void 0) {
            if (!IsReadableStream(this)) {
              throw streamBrandCheckException$1("getReader");
            }
            const options = convertReaderOptions(rawOptions, "First parameter");
            if (options.mode === void 0) {
              return AcquireReadableStreamDefaultReader(this);
            }
            return AcquireReadableStreamBYOBReader(this);
          }
          pipeThrough(rawTransform, rawOptions = {}) {
            if (!IsReadableStream(this)) {
              throw streamBrandCheckException$1("pipeThrough");
            }
            assertRequiredArgument(rawTransform, 1, "pipeThrough");
            const transform = convertReadableWritablePair(rawTransform, "First parameter");
            const options = convertPipeOptions(rawOptions, "Second parameter");
            if (IsReadableStreamLocked(this)) {
              throw new TypeError("ReadableStream.prototype.pipeThrough cannot be used on a locked ReadableStream");
            }
            if (IsWritableStreamLocked(transform.writable)) {
              throw new TypeError("ReadableStream.prototype.pipeThrough cannot be used on a locked WritableStream");
            }
            const promise = ReadableStreamPipeTo(this, transform.writable, options.preventClose, options.preventAbort, options.preventCancel, options.signal);
            setPromiseIsHandledToTrue(promise);
            return transform.readable;
          }
          pipeTo(destination, rawOptions = {}) {
            if (!IsReadableStream(this)) {
              return promiseRejectedWith(streamBrandCheckException$1("pipeTo"));
            }
            if (destination === void 0) {
              return promiseRejectedWith(`Parameter 1 is required in 'pipeTo'.`);
            }
            if (!IsWritableStream(destination)) {
              return promiseRejectedWith(new TypeError(`ReadableStream.prototype.pipeTo's first argument must be a WritableStream`));
            }
            let options;
            try {
              options = convertPipeOptions(rawOptions, "Second parameter");
            } catch (e2) {
              return promiseRejectedWith(e2);
            }
            if (IsReadableStreamLocked(this)) {
              return promiseRejectedWith(new TypeError("ReadableStream.prototype.pipeTo cannot be used on a locked ReadableStream"));
            }
            if (IsWritableStreamLocked(destination)) {
              return promiseRejectedWith(new TypeError("ReadableStream.prototype.pipeTo cannot be used on a locked WritableStream"));
            }
            return ReadableStreamPipeTo(this, destination, options.preventClose, options.preventAbort, options.preventCancel, options.signal);
          }
          tee() {
            if (!IsReadableStream(this)) {
              throw streamBrandCheckException$1("tee");
            }
            const branches = ReadableStreamTee(this);
            return CreateArrayFromList(branches);
          }
          values(rawOptions = void 0) {
            if (!IsReadableStream(this)) {
              throw streamBrandCheckException$1("values");
            }
            const options = convertIteratorOptions(rawOptions, "First parameter");
            return AcquireReadableStreamAsyncIterator(this, options.preventCancel);
          }
        }
        Object.defineProperties(ReadableStream2.prototype, {
          cancel: { enumerable: true },
          getReader: { enumerable: true },
          pipeThrough: { enumerable: true },
          pipeTo: { enumerable: true },
          tee: { enumerable: true },
          values: { enumerable: true },
          locked: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(ReadableStream2.prototype, SymbolPolyfill.toStringTag, {
            value: "ReadableStream",
            configurable: true
          });
        }
        if (typeof SymbolPolyfill.asyncIterator === "symbol") {
          Object.defineProperty(ReadableStream2.prototype, SymbolPolyfill.asyncIterator, {
            value: ReadableStream2.prototype.values,
            writable: true,
            configurable: true
          });
        }
        function CreateReadableStream(startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark = 1, sizeAlgorithm = () => 1) {
          const stream = Object.create(ReadableStream2.prototype);
          InitializeReadableStream(stream);
          const controller = Object.create(ReadableStreamDefaultController.prototype);
          SetUpReadableStreamDefaultController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, sizeAlgorithm);
          return stream;
        }
        function CreateReadableByteStream(startAlgorithm, pullAlgorithm, cancelAlgorithm) {
          const stream = Object.create(ReadableStream2.prototype);
          InitializeReadableStream(stream);
          const controller = Object.create(ReadableByteStreamController.prototype);
          SetUpReadableByteStreamController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, 0, void 0);
          return stream;
        }
        function InitializeReadableStream(stream) {
          stream._state = "readable";
          stream._reader = void 0;
          stream._storedError = void 0;
          stream._disturbed = false;
        }
        function IsReadableStream(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_readableStreamController")) {
            return false;
          }
          return x2 instanceof ReadableStream2;
        }
        function IsReadableStreamLocked(stream) {
          if (stream._reader === void 0) {
            return false;
          }
          return true;
        }
        function ReadableStreamCancel(stream, reason) {
          stream._disturbed = true;
          if (stream._state === "closed") {
            return promiseResolvedWith(void 0);
          }
          if (stream._state === "errored") {
            return promiseRejectedWith(stream._storedError);
          }
          ReadableStreamClose(stream);
          const reader = stream._reader;
          if (reader !== void 0 && IsReadableStreamBYOBReader(reader)) {
            reader._readIntoRequests.forEach((readIntoRequest) => {
              readIntoRequest._closeSteps(void 0);
            });
            reader._readIntoRequests = new SimpleQueue();
          }
          const sourceCancelPromise = stream._readableStreamController[CancelSteps](reason);
          return transformPromiseWith(sourceCancelPromise, noop3);
        }
        function ReadableStreamClose(stream) {
          stream._state = "closed";
          const reader = stream._reader;
          if (reader === void 0) {
            return;
          }
          defaultReaderClosedPromiseResolve(reader);
          if (IsReadableStreamDefaultReader(reader)) {
            reader._readRequests.forEach((readRequest) => {
              readRequest._closeSteps();
            });
            reader._readRequests = new SimpleQueue();
          }
        }
        function ReadableStreamError(stream, e2) {
          stream._state = "errored";
          stream._storedError = e2;
          const reader = stream._reader;
          if (reader === void 0) {
            return;
          }
          defaultReaderClosedPromiseReject(reader, e2);
          if (IsReadableStreamDefaultReader(reader)) {
            reader._readRequests.forEach((readRequest) => {
              readRequest._errorSteps(e2);
            });
            reader._readRequests = new SimpleQueue();
          } else {
            reader._readIntoRequests.forEach((readIntoRequest) => {
              readIntoRequest._errorSteps(e2);
            });
            reader._readIntoRequests = new SimpleQueue();
          }
        }
        function streamBrandCheckException$1(name) {
          return new TypeError(`ReadableStream.prototype.${name} can only be used on a ReadableStream`);
        }
        function convertQueuingStrategyInit(init2, context) {
          assertDictionary(init2, context);
          const highWaterMark = init2 === null || init2 === void 0 ? void 0 : init2.highWaterMark;
          assertRequiredField(highWaterMark, "highWaterMark", "QueuingStrategyInit");
          return {
            highWaterMark: convertUnrestrictedDouble(highWaterMark)
          };
        }
        const byteLengthSizeFunction = (chunk) => {
          return chunk.byteLength;
        };
        Object.defineProperty(byteLengthSizeFunction, "name", {
          value: "size",
          configurable: true
        });
        class ByteLengthQueuingStrategy {
          constructor(options) {
            assertRequiredArgument(options, 1, "ByteLengthQueuingStrategy");
            options = convertQueuingStrategyInit(options, "First parameter");
            this._byteLengthQueuingStrategyHighWaterMark = options.highWaterMark;
          }
          get highWaterMark() {
            if (!IsByteLengthQueuingStrategy(this)) {
              throw byteLengthBrandCheckException("highWaterMark");
            }
            return this._byteLengthQueuingStrategyHighWaterMark;
          }
          get size() {
            if (!IsByteLengthQueuingStrategy(this)) {
              throw byteLengthBrandCheckException("size");
            }
            return byteLengthSizeFunction;
          }
        }
        Object.defineProperties(ByteLengthQueuingStrategy.prototype, {
          highWaterMark: { enumerable: true },
          size: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(ByteLengthQueuingStrategy.prototype, SymbolPolyfill.toStringTag, {
            value: "ByteLengthQueuingStrategy",
            configurable: true
          });
        }
        function byteLengthBrandCheckException(name) {
          return new TypeError(`ByteLengthQueuingStrategy.prototype.${name} can only be used on a ByteLengthQueuingStrategy`);
        }
        function IsByteLengthQueuingStrategy(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_byteLengthQueuingStrategyHighWaterMark")) {
            return false;
          }
          return x2 instanceof ByteLengthQueuingStrategy;
        }
        const countSizeFunction = () => {
          return 1;
        };
        Object.defineProperty(countSizeFunction, "name", {
          value: "size",
          configurable: true
        });
        class CountQueuingStrategy {
          constructor(options) {
            assertRequiredArgument(options, 1, "CountQueuingStrategy");
            options = convertQueuingStrategyInit(options, "First parameter");
            this._countQueuingStrategyHighWaterMark = options.highWaterMark;
          }
          get highWaterMark() {
            if (!IsCountQueuingStrategy(this)) {
              throw countBrandCheckException("highWaterMark");
            }
            return this._countQueuingStrategyHighWaterMark;
          }
          get size() {
            if (!IsCountQueuingStrategy(this)) {
              throw countBrandCheckException("size");
            }
            return countSizeFunction;
          }
        }
        Object.defineProperties(CountQueuingStrategy.prototype, {
          highWaterMark: { enumerable: true },
          size: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(CountQueuingStrategy.prototype, SymbolPolyfill.toStringTag, {
            value: "CountQueuingStrategy",
            configurable: true
          });
        }
        function countBrandCheckException(name) {
          return new TypeError(`CountQueuingStrategy.prototype.${name} can only be used on a CountQueuingStrategy`);
        }
        function IsCountQueuingStrategy(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_countQueuingStrategyHighWaterMark")) {
            return false;
          }
          return x2 instanceof CountQueuingStrategy;
        }
        function convertTransformer(original, context) {
          assertDictionary(original, context);
          const flush = original === null || original === void 0 ? void 0 : original.flush;
          const readableType = original === null || original === void 0 ? void 0 : original.readableType;
          const start = original === null || original === void 0 ? void 0 : original.start;
          const transform = original === null || original === void 0 ? void 0 : original.transform;
          const writableType = original === null || original === void 0 ? void 0 : original.writableType;
          return {
            flush: flush === void 0 ? void 0 : convertTransformerFlushCallback(flush, original, `${context} has member 'flush' that`),
            readableType,
            start: start === void 0 ? void 0 : convertTransformerStartCallback(start, original, `${context} has member 'start' that`),
            transform: transform === void 0 ? void 0 : convertTransformerTransformCallback(transform, original, `${context} has member 'transform' that`),
            writableType
          };
        }
        function convertTransformerFlushCallback(fn, original, context) {
          assertFunction(fn, context);
          return (controller) => promiseCall(fn, original, [controller]);
        }
        function convertTransformerStartCallback(fn, original, context) {
          assertFunction(fn, context);
          return (controller) => reflectCall(fn, original, [controller]);
        }
        function convertTransformerTransformCallback(fn, original, context) {
          assertFunction(fn, context);
          return (chunk, controller) => promiseCall(fn, original, [chunk, controller]);
        }
        class TransformStream {
          constructor(rawTransformer = {}, rawWritableStrategy = {}, rawReadableStrategy = {}) {
            if (rawTransformer === void 0) {
              rawTransformer = null;
            }
            const writableStrategy = convertQueuingStrategy(rawWritableStrategy, "Second parameter");
            const readableStrategy = convertQueuingStrategy(rawReadableStrategy, "Third parameter");
            const transformer = convertTransformer(rawTransformer, "First parameter");
            if (transformer.readableType !== void 0) {
              throw new RangeError("Invalid readableType specified");
            }
            if (transformer.writableType !== void 0) {
              throw new RangeError("Invalid writableType specified");
            }
            const readableHighWaterMark = ExtractHighWaterMark(readableStrategy, 0);
            const readableSizeAlgorithm = ExtractSizeAlgorithm(readableStrategy);
            const writableHighWaterMark = ExtractHighWaterMark(writableStrategy, 1);
            const writableSizeAlgorithm = ExtractSizeAlgorithm(writableStrategy);
            let startPromise_resolve;
            const startPromise = newPromise((resolve2) => {
              startPromise_resolve = resolve2;
            });
            InitializeTransformStream(this, startPromise, writableHighWaterMark, writableSizeAlgorithm, readableHighWaterMark, readableSizeAlgorithm);
            SetUpTransformStreamDefaultControllerFromTransformer(this, transformer);
            if (transformer.start !== void 0) {
              startPromise_resolve(transformer.start(this._transformStreamController));
            } else {
              startPromise_resolve(void 0);
            }
          }
          get readable() {
            if (!IsTransformStream(this)) {
              throw streamBrandCheckException("readable");
            }
            return this._readable;
          }
          get writable() {
            if (!IsTransformStream(this)) {
              throw streamBrandCheckException("writable");
            }
            return this._writable;
          }
        }
        Object.defineProperties(TransformStream.prototype, {
          readable: { enumerable: true },
          writable: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(TransformStream.prototype, SymbolPolyfill.toStringTag, {
            value: "TransformStream",
            configurable: true
          });
        }
        function InitializeTransformStream(stream, startPromise, writableHighWaterMark, writableSizeAlgorithm, readableHighWaterMark, readableSizeAlgorithm) {
          function startAlgorithm() {
            return startPromise;
          }
          function writeAlgorithm(chunk) {
            return TransformStreamDefaultSinkWriteAlgorithm(stream, chunk);
          }
          function abortAlgorithm(reason) {
            return TransformStreamDefaultSinkAbortAlgorithm(stream, reason);
          }
          function closeAlgorithm() {
            return TransformStreamDefaultSinkCloseAlgorithm(stream);
          }
          stream._writable = CreateWritableStream(startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, writableHighWaterMark, writableSizeAlgorithm);
          function pullAlgorithm() {
            return TransformStreamDefaultSourcePullAlgorithm(stream);
          }
          function cancelAlgorithm(reason) {
            TransformStreamErrorWritableAndUnblockWrite(stream, reason);
            return promiseResolvedWith(void 0);
          }
          stream._readable = CreateReadableStream(startAlgorithm, pullAlgorithm, cancelAlgorithm, readableHighWaterMark, readableSizeAlgorithm);
          stream._backpressure = void 0;
          stream._backpressureChangePromise = void 0;
          stream._backpressureChangePromise_resolve = void 0;
          TransformStreamSetBackpressure(stream, true);
          stream._transformStreamController = void 0;
        }
        function IsTransformStream(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_transformStreamController")) {
            return false;
          }
          return x2 instanceof TransformStream;
        }
        function TransformStreamError(stream, e2) {
          ReadableStreamDefaultControllerError(stream._readable._readableStreamController, e2);
          TransformStreamErrorWritableAndUnblockWrite(stream, e2);
        }
        function TransformStreamErrorWritableAndUnblockWrite(stream, e2) {
          TransformStreamDefaultControllerClearAlgorithms(stream._transformStreamController);
          WritableStreamDefaultControllerErrorIfNeeded(stream._writable._writableStreamController, e2);
          if (stream._backpressure) {
            TransformStreamSetBackpressure(stream, false);
          }
        }
        function TransformStreamSetBackpressure(stream, backpressure) {
          if (stream._backpressureChangePromise !== void 0) {
            stream._backpressureChangePromise_resolve();
          }
          stream._backpressureChangePromise = newPromise((resolve2) => {
            stream._backpressureChangePromise_resolve = resolve2;
          });
          stream._backpressure = backpressure;
        }
        class TransformStreamDefaultController {
          constructor() {
            throw new TypeError("Illegal constructor");
          }
          get desiredSize() {
            if (!IsTransformStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException("desiredSize");
            }
            const readableController = this._controlledTransformStream._readable._readableStreamController;
            return ReadableStreamDefaultControllerGetDesiredSize(readableController);
          }
          enqueue(chunk = void 0) {
            if (!IsTransformStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException("enqueue");
            }
            TransformStreamDefaultControllerEnqueue(this, chunk);
          }
          error(reason = void 0) {
            if (!IsTransformStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException("error");
            }
            TransformStreamDefaultControllerError(this, reason);
          }
          terminate() {
            if (!IsTransformStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException("terminate");
            }
            TransformStreamDefaultControllerTerminate(this);
          }
        }
        Object.defineProperties(TransformStreamDefaultController.prototype, {
          enqueue: { enumerable: true },
          error: { enumerable: true },
          terminate: { enumerable: true },
          desiredSize: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(TransformStreamDefaultController.prototype, SymbolPolyfill.toStringTag, {
            value: "TransformStreamDefaultController",
            configurable: true
          });
        }
        function IsTransformStreamDefaultController(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_controlledTransformStream")) {
            return false;
          }
          return x2 instanceof TransformStreamDefaultController;
        }
        function SetUpTransformStreamDefaultController(stream, controller, transformAlgorithm, flushAlgorithm) {
          controller._controlledTransformStream = stream;
          stream._transformStreamController = controller;
          controller._transformAlgorithm = transformAlgorithm;
          controller._flushAlgorithm = flushAlgorithm;
        }
        function SetUpTransformStreamDefaultControllerFromTransformer(stream, transformer) {
          const controller = Object.create(TransformStreamDefaultController.prototype);
          let transformAlgorithm = (chunk) => {
            try {
              TransformStreamDefaultControllerEnqueue(controller, chunk);
              return promiseResolvedWith(void 0);
            } catch (transformResultE) {
              return promiseRejectedWith(transformResultE);
            }
          };
          let flushAlgorithm = () => promiseResolvedWith(void 0);
          if (transformer.transform !== void 0) {
            transformAlgorithm = (chunk) => transformer.transform(chunk, controller);
          }
          if (transformer.flush !== void 0) {
            flushAlgorithm = () => transformer.flush(controller);
          }
          SetUpTransformStreamDefaultController(stream, controller, transformAlgorithm, flushAlgorithm);
        }
        function TransformStreamDefaultControllerClearAlgorithms(controller) {
          controller._transformAlgorithm = void 0;
          controller._flushAlgorithm = void 0;
        }
        function TransformStreamDefaultControllerEnqueue(controller, chunk) {
          const stream = controller._controlledTransformStream;
          const readableController = stream._readable._readableStreamController;
          if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(readableController)) {
            throw new TypeError("Readable side is not in a state that permits enqueue");
          }
          try {
            ReadableStreamDefaultControllerEnqueue(readableController, chunk);
          } catch (e2) {
            TransformStreamErrorWritableAndUnblockWrite(stream, e2);
            throw stream._readable._storedError;
          }
          const backpressure = ReadableStreamDefaultControllerHasBackpressure(readableController);
          if (backpressure !== stream._backpressure) {
            TransformStreamSetBackpressure(stream, true);
          }
        }
        function TransformStreamDefaultControllerError(controller, e2) {
          TransformStreamError(controller._controlledTransformStream, e2);
        }
        function TransformStreamDefaultControllerPerformTransform(controller, chunk) {
          const transformPromise = controller._transformAlgorithm(chunk);
          return transformPromiseWith(transformPromise, void 0, (r2) => {
            TransformStreamError(controller._controlledTransformStream, r2);
            throw r2;
          });
        }
        function TransformStreamDefaultControllerTerminate(controller) {
          const stream = controller._controlledTransformStream;
          const readableController = stream._readable._readableStreamController;
          ReadableStreamDefaultControllerClose(readableController);
          const error2 = new TypeError("TransformStream terminated");
          TransformStreamErrorWritableAndUnblockWrite(stream, error2);
        }
        function TransformStreamDefaultSinkWriteAlgorithm(stream, chunk) {
          const controller = stream._transformStreamController;
          if (stream._backpressure) {
            const backpressureChangePromise = stream._backpressureChangePromise;
            return transformPromiseWith(backpressureChangePromise, () => {
              const writable2 = stream._writable;
              const state = writable2._state;
              if (state === "erroring") {
                throw writable2._storedError;
              }
              return TransformStreamDefaultControllerPerformTransform(controller, chunk);
            });
          }
          return TransformStreamDefaultControllerPerformTransform(controller, chunk);
        }
        function TransformStreamDefaultSinkAbortAlgorithm(stream, reason) {
          TransformStreamError(stream, reason);
          return promiseResolvedWith(void 0);
        }
        function TransformStreamDefaultSinkCloseAlgorithm(stream) {
          const readable2 = stream._readable;
          const controller = stream._transformStreamController;
          const flushPromise = controller._flushAlgorithm();
          TransformStreamDefaultControllerClearAlgorithms(controller);
          return transformPromiseWith(flushPromise, () => {
            if (readable2._state === "errored") {
              throw readable2._storedError;
            }
            ReadableStreamDefaultControllerClose(readable2._readableStreamController);
          }, (r2) => {
            TransformStreamError(stream, r2);
            throw readable2._storedError;
          });
        }
        function TransformStreamDefaultSourcePullAlgorithm(stream) {
          TransformStreamSetBackpressure(stream, false);
          return stream._backpressureChangePromise;
        }
        function defaultControllerBrandCheckException(name) {
          return new TypeError(`TransformStreamDefaultController.prototype.${name} can only be used on a TransformStreamDefaultController`);
        }
        function streamBrandCheckException(name) {
          return new TypeError(`TransformStream.prototype.${name} can only be used on a TransformStream`);
        }
        exports2.ByteLengthQueuingStrategy = ByteLengthQueuingStrategy;
        exports2.CountQueuingStrategy = CountQueuingStrategy;
        exports2.ReadableByteStreamController = ReadableByteStreamController;
        exports2.ReadableStream = ReadableStream2;
        exports2.ReadableStreamBYOBReader = ReadableStreamBYOBReader;
        exports2.ReadableStreamBYOBRequest = ReadableStreamBYOBRequest;
        exports2.ReadableStreamDefaultController = ReadableStreamDefaultController;
        exports2.ReadableStreamDefaultReader = ReadableStreamDefaultReader;
        exports2.TransformStream = TransformStream;
        exports2.TransformStreamDefaultController = TransformStreamDefaultController;
        exports2.WritableStream = WritableStream;
        exports2.WritableStreamDefaultController = WritableStreamDefaultController;
        exports2.WritableStreamDefaultWriter = WritableStreamDefaultWriter;
        Object.defineProperty(exports2, "__esModule", { value: true });
      });
    })(ponyfill_es2018, ponyfill_es2018.exports);
    POOL_SIZE$1 = 65536;
    if (!globalThis.ReadableStream) {
      try {
        const process2 = require("process");
        const { emitWarning } = process2;
        try {
          process2.emitWarning = () => {
          };
          Object.assign(globalThis, require("stream/web"));
          process2.emitWarning = emitWarning;
        } catch (error2) {
          process2.emitWarning = emitWarning;
          throw error2;
        }
      } catch (error2) {
        Object.assign(globalThis, ponyfill_es2018.exports);
      }
    }
    try {
      const { Blob: Blob2 } = require("buffer");
      if (Blob2 && !Blob2.prototype.stream) {
        Blob2.prototype.stream = function name(params) {
          let position = 0;
          const blob = this;
          return new ReadableStream({
            type: "bytes",
            async pull(ctrl) {
              const chunk = blob.slice(position, Math.min(blob.size, position + POOL_SIZE$1));
              const buffer = await chunk.arrayBuffer();
              position += buffer.byteLength;
              ctrl.enqueue(new Uint8Array(buffer));
              if (position === blob.size) {
                ctrl.close();
              }
            }
          });
        };
      }
    } catch (error2) {
    }
    POOL_SIZE = 65536;
    _Blob = (_a = class {
      constructor(blobParts = [], options = {}) {
        __privateAdd(this, _parts, []);
        __privateAdd(this, _type, "");
        __privateAdd(this, _size, 0);
        if (typeof blobParts !== "object" || blobParts === null) {
          throw new TypeError("Failed to construct 'Blob': The provided value cannot be converted to a sequence.");
        }
        if (typeof blobParts[Symbol.iterator] !== "function") {
          throw new TypeError("Failed to construct 'Blob': The object must have a callable @@iterator property.");
        }
        if (typeof options !== "object" && typeof options !== "function") {
          throw new TypeError("Failed to construct 'Blob': parameter 2 cannot convert to dictionary.");
        }
        if (options === null)
          options = {};
        const encoder2 = new TextEncoder();
        for (const element of blobParts) {
          let part;
          if (ArrayBuffer.isView(element)) {
            part = new Uint8Array(element.buffer.slice(element.byteOffset, element.byteOffset + element.byteLength));
          } else if (element instanceof ArrayBuffer) {
            part = new Uint8Array(element.slice(0));
          } else if (element instanceof _a) {
            part = element;
          } else {
            part = encoder2.encode(element);
          }
          __privateSet(this, _size, __privateGet(this, _size) + (ArrayBuffer.isView(part) ? part.byteLength : part.size));
          __privateGet(this, _parts).push(part);
        }
        const type = options.type === void 0 ? "" : String(options.type);
        __privateSet(this, _type, /^[\x20-\x7E]*$/.test(type) ? type : "");
      }
      get size() {
        return __privateGet(this, _size);
      }
      get type() {
        return __privateGet(this, _type);
      }
      async text() {
        const decoder = new TextDecoder();
        let str = "";
        for await (const part of toIterator(__privateGet(this, _parts), false)) {
          str += decoder.decode(part, { stream: true });
        }
        str += decoder.decode();
        return str;
      }
      async arrayBuffer() {
        const data = new Uint8Array(this.size);
        let offset = 0;
        for await (const chunk of toIterator(__privateGet(this, _parts), false)) {
          data.set(chunk, offset);
          offset += chunk.length;
        }
        return data.buffer;
      }
      stream() {
        const it = toIterator(__privateGet(this, _parts), true);
        return new globalThis.ReadableStream({
          type: "bytes",
          async pull(ctrl) {
            const chunk = await it.next();
            chunk.done ? ctrl.close() : ctrl.enqueue(chunk.value);
          },
          async cancel() {
            await it.return();
          }
        });
      }
      slice(start = 0, end = this.size, type = "") {
        const { size } = this;
        let relativeStart = start < 0 ? Math.max(size + start, 0) : Math.min(start, size);
        let relativeEnd = end < 0 ? Math.max(size + end, 0) : Math.min(end, size);
        const span = Math.max(relativeEnd - relativeStart, 0);
        const parts = __privateGet(this, _parts);
        const blobParts = [];
        let added = 0;
        for (const part of parts) {
          if (added >= span) {
            break;
          }
          const size2 = ArrayBuffer.isView(part) ? part.byteLength : part.size;
          if (relativeStart && size2 <= relativeStart) {
            relativeStart -= size2;
            relativeEnd -= size2;
          } else {
            let chunk;
            if (ArrayBuffer.isView(part)) {
              chunk = part.subarray(relativeStart, Math.min(size2, relativeEnd));
              added += chunk.byteLength;
            } else {
              chunk = part.slice(relativeStart, Math.min(size2, relativeEnd));
              added += chunk.size;
            }
            relativeEnd -= size2;
            blobParts.push(chunk);
            relativeStart = 0;
          }
        }
        const blob = new _a([], { type: String(type).toLowerCase() });
        __privateSet(blob, _size, span);
        __privateSet(blob, _parts, blobParts);
        return blob;
      }
      get [Symbol.toStringTag]() {
        return "Blob";
      }
      static [Symbol.hasInstance](object) {
        return object && typeof object === "object" && typeof object.constructor === "function" && (typeof object.stream === "function" || typeof object.arrayBuffer === "function") && /^(Blob|File)$/.test(object[Symbol.toStringTag]);
      }
    }, _parts = new WeakMap(), _type = new WeakMap(), _size = new WeakMap(), _a);
    Object.defineProperties(_Blob.prototype, {
      size: { enumerable: true },
      type: { enumerable: true },
      slice: { enumerable: true }
    });
    Blob = _Blob;
    Blob$1 = Blob;
    _File = (_a2 = class extends Blob$1 {
      constructor(fileBits, fileName, options = {}) {
        if (arguments.length < 2) {
          throw new TypeError(`Failed to construct 'File': 2 arguments required, but only ${arguments.length} present.`);
        }
        super(fileBits, options);
        __privateAdd(this, _lastModified, 0);
        __privateAdd(this, _name, "");
        if (options === null)
          options = {};
        const lastModified = options.lastModified === void 0 ? Date.now() : Number(options.lastModified);
        if (!Number.isNaN(lastModified)) {
          __privateSet(this, _lastModified, lastModified);
        }
        __privateSet(this, _name, String(fileName));
      }
      get name() {
        return __privateGet(this, _name);
      }
      get lastModified() {
        return __privateGet(this, _lastModified);
      }
      get [Symbol.toStringTag]() {
        return "File";
      }
    }, _lastModified = new WeakMap(), _name = new WeakMap(), _a2);
    File = _File;
    ({ toStringTag: t, iterator: i, hasInstance: h } = Symbol);
    r = Math.random;
    m = "append,set,get,getAll,delete,keys,values,entries,forEach,constructor".split(",");
    f2 = (a, b, c) => (a += "", /^(Blob|File)$/.test(b && b[t]) ? [(c = c !== void 0 ? c + "" : b[t] == "File" ? b.name : "blob", a), b.name !== c || b[t] == "blob" ? new File([b], c, b) : b] : [a, b + ""]);
    e = (c, f3) => (f3 ? c : c.replace(/\r?\n|\r/g, "\r\n")).replace(/\n/g, "%0A").replace(/\r/g, "%0D").replace(/"/g, "%22");
    x = (n, a, e2) => {
      if (a.length < e2) {
        throw new TypeError(`Failed to execute '${n}' on 'FormData': ${e2} arguments required, but only ${a.length} present.`);
      }
    };
    FormData = (_a3 = class {
      constructor(...a) {
        __privateAdd(this, _d, []);
        if (a.length)
          throw new TypeError(`Failed to construct 'FormData': parameter 1 is not of type 'HTMLFormElement'.`);
      }
      get [t]() {
        return "FormData";
      }
      [i]() {
        return this.entries();
      }
      static [h](o) {
        return o && typeof o === "object" && o[t] === "FormData" && !m.some((m2) => typeof o[m2] != "function");
      }
      append(...a) {
        x("append", arguments, 2);
        __privateGet(this, _d).push(f2(...a));
      }
      delete(a) {
        x("delete", arguments, 1);
        a += "";
        __privateSet(this, _d, __privateGet(this, _d).filter(([b]) => b !== a));
      }
      get(a) {
        x("get", arguments, 1);
        a += "";
        for (var b = __privateGet(this, _d), l = b.length, c = 0; c < l; c++)
          if (b[c][0] === a)
            return b[c][1];
        return null;
      }
      getAll(a, b) {
        x("getAll", arguments, 1);
        b = [];
        a += "";
        __privateGet(this, _d).forEach((c) => c[0] === a && b.push(c[1]));
        return b;
      }
      has(a) {
        x("has", arguments, 1);
        a += "";
        return __privateGet(this, _d).some((b) => b[0] === a);
      }
      forEach(a, b) {
        x("forEach", arguments, 1);
        for (var [c, d] of this)
          a.call(b, d, c, this);
      }
      set(...a) {
        x("set", arguments, 2);
        var b = [], c = true;
        a = f2(...a);
        __privateGet(this, _d).forEach((d) => {
          d[0] === a[0] ? c && (c = !b.push(a)) : b.push(d);
        });
        c && b.push(a);
        __privateSet(this, _d, b);
      }
      *entries() {
        yield* __privateGet(this, _d);
      }
      *keys() {
        for (var [a] of this)
          yield a;
      }
      *values() {
        for (var [, a] of this)
          yield a;
      }
    }, _d = new WeakMap(), _a3);
    FetchBaseError = class extends Error {
      constructor(message, type) {
        super(message);
        Error.captureStackTrace(this, this.constructor);
        this.type = type;
      }
      get name() {
        return this.constructor.name;
      }
      get [Symbol.toStringTag]() {
        return this.constructor.name;
      }
    };
    FetchError = class extends FetchBaseError {
      constructor(message, type, systemError) {
        super(message, type);
        if (systemError) {
          this.code = this.errno = systemError.code;
          this.erroredSysCall = systemError.syscall;
        }
      }
    };
    NAME = Symbol.toStringTag;
    isURLSearchParameters = (object) => {
      return typeof object === "object" && typeof object.append === "function" && typeof object.delete === "function" && typeof object.get === "function" && typeof object.getAll === "function" && typeof object.has === "function" && typeof object.set === "function" && typeof object.sort === "function" && object[NAME] === "URLSearchParams";
    };
    isBlob = (object) => {
      return object && typeof object === "object" && typeof object.arrayBuffer === "function" && typeof object.type === "string" && typeof object.stream === "function" && typeof object.constructor === "function" && /^(Blob|File)$/.test(object[NAME]);
    };
    isAbortSignal = (object) => {
      return typeof object === "object" && (object[NAME] === "AbortSignal" || object[NAME] === "EventTarget");
    };
    INTERNALS$2 = Symbol("Body internals");
    Body = class {
      constructor(body, {
        size = 0
      } = {}) {
        let boundary = null;
        if (body === null) {
          body = null;
        } else if (isURLSearchParameters(body)) {
          body = Buffer.from(body.toString());
        } else if (isBlob(body))
          ;
        else if (Buffer.isBuffer(body))
          ;
        else if (import_node_util.types.isAnyArrayBuffer(body)) {
          body = Buffer.from(body);
        } else if (ArrayBuffer.isView(body)) {
          body = Buffer.from(body.buffer, body.byteOffset, body.byteLength);
        } else if (body instanceof import_node_stream.default)
          ;
        else if (body instanceof FormData) {
          body = formDataToBlob(body);
          boundary = body.type.split("=")[1];
        } else {
          body = Buffer.from(String(body));
        }
        let stream = body;
        if (Buffer.isBuffer(body)) {
          stream = import_node_stream.default.Readable.from(body);
        } else if (isBlob(body)) {
          stream = import_node_stream.default.Readable.from(body.stream());
        }
        this[INTERNALS$2] = {
          body,
          stream,
          boundary,
          disturbed: false,
          error: null
        };
        this.size = size;
        if (body instanceof import_node_stream.default) {
          body.on("error", (error_) => {
            const error2 = error_ instanceof FetchBaseError ? error_ : new FetchError(`Invalid response body while trying to fetch ${this.url}: ${error_.message}`, "system", error_);
            this[INTERNALS$2].error = error2;
          });
        }
      }
      get body() {
        return this[INTERNALS$2].stream;
      }
      get bodyUsed() {
        return this[INTERNALS$2].disturbed;
      }
      async arrayBuffer() {
        const { buffer, byteOffset, byteLength } = await consumeBody(this);
        return buffer.slice(byteOffset, byteOffset + byteLength);
      }
      async formData() {
        const ct = this.headers.get("content-type");
        if (ct.startsWith("application/x-www-form-urlencoded")) {
          const formData = new FormData();
          const parameters = new URLSearchParams(await this.text());
          for (const [name, value] of parameters) {
            formData.append(name, value);
          }
          return formData;
        }
        const { toFormData: toFormData2 } = await Promise.resolve().then(() => (init_multipart_parser(), multipart_parser_exports));
        return toFormData2(this.body, ct);
      }
      async blob() {
        const ct = this.headers && this.headers.get("content-type") || this[INTERNALS$2].body && this[INTERNALS$2].body.type || "";
        const buf = await this.buffer();
        return new Blob$1([buf], {
          type: ct
        });
      }
      async json() {
        const buffer = await consumeBody(this);
        return JSON.parse(buffer.toString());
      }
      async text() {
        const buffer = await consumeBody(this);
        return buffer.toString();
      }
      buffer() {
        return consumeBody(this);
      }
    };
    Body.prototype.buffer = (0, import_node_util.deprecate)(Body.prototype.buffer, "Please use 'response.arrayBuffer()' instead of 'response.buffer()'", "node-fetch#buffer");
    Object.defineProperties(Body.prototype, {
      body: { enumerable: true },
      bodyUsed: { enumerable: true },
      arrayBuffer: { enumerable: true },
      blob: { enumerable: true },
      json: { enumerable: true },
      text: { enumerable: true }
    });
    clone = (instance, highWaterMark) => {
      let p1;
      let p2;
      let { body } = instance[INTERNALS$2];
      if (instance.bodyUsed) {
        throw new Error("cannot clone body after it is used");
      }
      if (body instanceof import_node_stream.default && typeof body.getBoundary !== "function") {
        p1 = new import_node_stream.PassThrough({ highWaterMark });
        p2 = new import_node_stream.PassThrough({ highWaterMark });
        body.pipe(p1);
        body.pipe(p2);
        instance[INTERNALS$2].stream = p1;
        body = p2;
      }
      return body;
    };
    getNonSpecFormDataBoundary = (0, import_node_util.deprecate)((body) => body.getBoundary(), "form-data doesn't follow the spec and requires special treatment. Use alternative package", "https://github.com/node-fetch/node-fetch/issues/1167");
    extractContentType = (body, request) => {
      if (body === null) {
        return null;
      }
      if (typeof body === "string") {
        return "text/plain;charset=UTF-8";
      }
      if (isURLSearchParameters(body)) {
        return "application/x-www-form-urlencoded;charset=UTF-8";
      }
      if (isBlob(body)) {
        return body.type || null;
      }
      if (Buffer.isBuffer(body) || import_node_util.types.isAnyArrayBuffer(body) || ArrayBuffer.isView(body)) {
        return null;
      }
      if (body instanceof FormData) {
        return `multipart/form-data; boundary=${request[INTERNALS$2].boundary}`;
      }
      if (body && typeof body.getBoundary === "function") {
        return `multipart/form-data;boundary=${getNonSpecFormDataBoundary(body)}`;
      }
      if (body instanceof import_node_stream.default) {
        return null;
      }
      return "text/plain;charset=UTF-8";
    };
    getTotalBytes = (request) => {
      const { body } = request[INTERNALS$2];
      if (body === null) {
        return 0;
      }
      if (isBlob(body)) {
        return body.size;
      }
      if (Buffer.isBuffer(body)) {
        return body.length;
      }
      if (body && typeof body.getLengthSync === "function") {
        return body.hasKnownLength && body.hasKnownLength() ? body.getLengthSync() : null;
      }
      return null;
    };
    writeToStream = (dest, { body }) => {
      if (body === null) {
        dest.end();
      } else {
        body.pipe(dest);
      }
    };
    validateHeaderName = typeof import_node_http.default.validateHeaderName === "function" ? import_node_http.default.validateHeaderName : (name) => {
      if (!/^[\^`\-\w!#$%&'*+.|~]+$/.test(name)) {
        const error2 = new TypeError(`Header name must be a valid HTTP token [${name}]`);
        Object.defineProperty(error2, "code", { value: "ERR_INVALID_HTTP_TOKEN" });
        throw error2;
      }
    };
    validateHeaderValue = typeof import_node_http.default.validateHeaderValue === "function" ? import_node_http.default.validateHeaderValue : (name, value) => {
      if (/[^\t\u0020-\u007E\u0080-\u00FF]/.test(value)) {
        const error2 = new TypeError(`Invalid character in header content ["${name}"]`);
        Object.defineProperty(error2, "code", { value: "ERR_INVALID_CHAR" });
        throw error2;
      }
    };
    Headers2 = class extends URLSearchParams {
      constructor(init2) {
        let result = [];
        if (init2 instanceof Headers2) {
          const raw = init2.raw();
          for (const [name, values] of Object.entries(raw)) {
            result.push(...values.map((value) => [name, value]));
          }
        } else if (init2 == null)
          ;
        else if (typeof init2 === "object" && !import_node_util.types.isBoxedPrimitive(init2)) {
          const method = init2[Symbol.iterator];
          if (method == null) {
            result.push(...Object.entries(init2));
          } else {
            if (typeof method !== "function") {
              throw new TypeError("Header pairs must be iterable");
            }
            result = [...init2].map((pair) => {
              if (typeof pair !== "object" || import_node_util.types.isBoxedPrimitive(pair)) {
                throw new TypeError("Each header pair must be an iterable object");
              }
              return [...pair];
            }).map((pair) => {
              if (pair.length !== 2) {
                throw new TypeError("Each header pair must be a name/value tuple");
              }
              return [...pair];
            });
          }
        } else {
          throw new TypeError("Failed to construct 'Headers': The provided value is not of type '(sequence<sequence<ByteString>> or record<ByteString, ByteString>)");
        }
        result = result.length > 0 ? result.map(([name, value]) => {
          validateHeaderName(name);
          validateHeaderValue(name, String(value));
          return [String(name).toLowerCase(), String(value)];
        }) : void 0;
        super(result);
        return new Proxy(this, {
          get(target, p, receiver) {
            switch (p) {
              case "append":
              case "set":
                return (name, value) => {
                  validateHeaderName(name);
                  validateHeaderValue(name, String(value));
                  return URLSearchParams.prototype[p].call(target, String(name).toLowerCase(), String(value));
                };
              case "delete":
              case "has":
              case "getAll":
                return (name) => {
                  validateHeaderName(name);
                  return URLSearchParams.prototype[p].call(target, String(name).toLowerCase());
                };
              case "keys":
                return () => {
                  target.sort();
                  return new Set(URLSearchParams.prototype.keys.call(target)).keys();
                };
              default:
                return Reflect.get(target, p, receiver);
            }
          }
        });
      }
      get [Symbol.toStringTag]() {
        return this.constructor.name;
      }
      toString() {
        return Object.prototype.toString.call(this);
      }
      get(name) {
        const values = this.getAll(name);
        if (values.length === 0) {
          return null;
        }
        let value = values.join(", ");
        if (/^content-encoding$/i.test(name)) {
          value = value.toLowerCase();
        }
        return value;
      }
      forEach(callback, thisArg = void 0) {
        for (const name of this.keys()) {
          Reflect.apply(callback, thisArg, [this.get(name), name, this]);
        }
      }
      *values() {
        for (const name of this.keys()) {
          yield this.get(name);
        }
      }
      *entries() {
        for (const name of this.keys()) {
          yield [name, this.get(name)];
        }
      }
      [Symbol.iterator]() {
        return this.entries();
      }
      raw() {
        return [...this.keys()].reduce((result, key2) => {
          result[key2] = this.getAll(key2);
          return result;
        }, {});
      }
      [Symbol.for("nodejs.util.inspect.custom")]() {
        return [...this.keys()].reduce((result, key2) => {
          const values = this.getAll(key2);
          if (key2 === "host") {
            result[key2] = values[0];
          } else {
            result[key2] = values.length > 1 ? values : values[0];
          }
          return result;
        }, {});
      }
    };
    Object.defineProperties(Headers2.prototype, ["get", "entries", "forEach", "values"].reduce((result, property) => {
      result[property] = { enumerable: true };
      return result;
    }, {}));
    redirectStatus = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]);
    isRedirect = (code) => {
      return redirectStatus.has(code);
    };
    INTERNALS$1 = Symbol("Response internals");
    Response2 = class extends Body {
      constructor(body = null, options = {}) {
        super(body, options);
        const status = options.status != null ? options.status : 200;
        const headers2 = new Headers2(options.headers);
        if (body !== null && !headers2.has("Content-Type")) {
          const contentType = extractContentType(body, this);
          if (contentType) {
            headers2.append("Content-Type", contentType);
          }
        }
        this[INTERNALS$1] = {
          type: "default",
          url: options.url,
          status,
          statusText: options.statusText || "",
          headers: headers2,
          counter: options.counter,
          highWaterMark: options.highWaterMark
        };
      }
      get type() {
        return this[INTERNALS$1].type;
      }
      get url() {
        return this[INTERNALS$1].url || "";
      }
      get status() {
        return this[INTERNALS$1].status;
      }
      get ok() {
        return this[INTERNALS$1].status >= 200 && this[INTERNALS$1].status < 300;
      }
      get redirected() {
        return this[INTERNALS$1].counter > 0;
      }
      get statusText() {
        return this[INTERNALS$1].statusText;
      }
      get headers() {
        return this[INTERNALS$1].headers;
      }
      get highWaterMark() {
        return this[INTERNALS$1].highWaterMark;
      }
      clone() {
        return new Response2(clone(this, this.highWaterMark), {
          type: this.type,
          url: this.url,
          status: this.status,
          statusText: this.statusText,
          headers: this.headers,
          ok: this.ok,
          redirected: this.redirected,
          size: this.size,
          highWaterMark: this.highWaterMark
        });
      }
      static redirect(url, status = 302) {
        if (!isRedirect(status)) {
          throw new RangeError('Failed to execute "redirect" on "response": Invalid status code');
        }
        return new Response2(null, {
          headers: {
            location: new URL(url).toString()
          },
          status
        });
      }
      static error() {
        const response = new Response2(null, { status: 0, statusText: "" });
        response[INTERNALS$1].type = "error";
        return response;
      }
      get [Symbol.toStringTag]() {
        return "Response";
      }
    };
    Object.defineProperties(Response2.prototype, {
      type: { enumerable: true },
      url: { enumerable: true },
      status: { enumerable: true },
      ok: { enumerable: true },
      redirected: { enumerable: true },
      statusText: { enumerable: true },
      headers: { enumerable: true },
      clone: { enumerable: true }
    });
    getSearch = (parsedURL) => {
      if (parsedURL.search) {
        return parsedURL.search;
      }
      const lastOffset = parsedURL.href.length - 1;
      const hash2 = parsedURL.hash || (parsedURL.href[lastOffset] === "#" ? "#" : "");
      return parsedURL.href[lastOffset - hash2.length] === "?" ? "?" : "";
    };
    ReferrerPolicy = /* @__PURE__ */ new Set([
      "",
      "no-referrer",
      "no-referrer-when-downgrade",
      "same-origin",
      "origin",
      "strict-origin",
      "origin-when-cross-origin",
      "strict-origin-when-cross-origin",
      "unsafe-url"
    ]);
    DEFAULT_REFERRER_POLICY = "strict-origin-when-cross-origin";
    INTERNALS = Symbol("Request internals");
    isRequest = (object) => {
      return typeof object === "object" && typeof object[INTERNALS] === "object";
    };
    Request2 = class extends Body {
      constructor(input, init2 = {}) {
        let parsedURL;
        if (isRequest(input)) {
          parsedURL = new URL(input.url);
        } else {
          parsedURL = new URL(input);
          input = {};
        }
        if (parsedURL.username !== "" || parsedURL.password !== "") {
          throw new TypeError(`${parsedURL} is an url with embedded credentails.`);
        }
        let method = init2.method || input.method || "GET";
        method = method.toUpperCase();
        if ((init2.body != null || isRequest(input)) && input.body !== null && (method === "GET" || method === "HEAD")) {
          throw new TypeError("Request with GET/HEAD method cannot have body");
        }
        const inputBody = init2.body ? init2.body : isRequest(input) && input.body !== null ? clone(input) : null;
        super(inputBody, {
          size: init2.size || input.size || 0
        });
        const headers2 = new Headers2(init2.headers || input.headers || {});
        if (inputBody !== null && !headers2.has("Content-Type")) {
          const contentType = extractContentType(inputBody, this);
          if (contentType) {
            headers2.set("Content-Type", contentType);
          }
        }
        let signal = isRequest(input) ? input.signal : null;
        if ("signal" in init2) {
          signal = init2.signal;
        }
        if (signal != null && !isAbortSignal(signal)) {
          throw new TypeError("Expected signal to be an instanceof AbortSignal or EventTarget");
        }
        let referrer = init2.referrer == null ? input.referrer : init2.referrer;
        if (referrer === "") {
          referrer = "no-referrer";
        } else if (referrer) {
          const parsedReferrer = new URL(referrer);
          referrer = /^about:(\/\/)?client$/.test(parsedReferrer) ? "client" : parsedReferrer;
        } else {
          referrer = void 0;
        }
        this[INTERNALS] = {
          method,
          redirect: init2.redirect || input.redirect || "follow",
          headers: headers2,
          parsedURL,
          signal,
          referrer
        };
        this.follow = init2.follow === void 0 ? input.follow === void 0 ? 20 : input.follow : init2.follow;
        this.compress = init2.compress === void 0 ? input.compress === void 0 ? true : input.compress : init2.compress;
        this.counter = init2.counter || input.counter || 0;
        this.agent = init2.agent || input.agent;
        this.highWaterMark = init2.highWaterMark || input.highWaterMark || 16384;
        this.insecureHTTPParser = init2.insecureHTTPParser || input.insecureHTTPParser || false;
        this.referrerPolicy = init2.referrerPolicy || input.referrerPolicy || "";
      }
      get method() {
        return this[INTERNALS].method;
      }
      get url() {
        return (0, import_node_url.format)(this[INTERNALS].parsedURL);
      }
      get headers() {
        return this[INTERNALS].headers;
      }
      get redirect() {
        return this[INTERNALS].redirect;
      }
      get signal() {
        return this[INTERNALS].signal;
      }
      get referrer() {
        if (this[INTERNALS].referrer === "no-referrer") {
          return "";
        }
        if (this[INTERNALS].referrer === "client") {
          return "about:client";
        }
        if (this[INTERNALS].referrer) {
          return this[INTERNALS].referrer.toString();
        }
        return void 0;
      }
      get referrerPolicy() {
        return this[INTERNALS].referrerPolicy;
      }
      set referrerPolicy(referrerPolicy) {
        this[INTERNALS].referrerPolicy = validateReferrerPolicy(referrerPolicy);
      }
      clone() {
        return new Request2(this);
      }
      get [Symbol.toStringTag]() {
        return "Request";
      }
    };
    Object.defineProperties(Request2.prototype, {
      method: { enumerable: true },
      url: { enumerable: true },
      headers: { enumerable: true },
      redirect: { enumerable: true },
      clone: { enumerable: true },
      signal: { enumerable: true },
      referrer: { enumerable: true },
      referrerPolicy: { enumerable: true }
    });
    getNodeRequestOptions = (request) => {
      const { parsedURL } = request[INTERNALS];
      const headers2 = new Headers2(request[INTERNALS].headers);
      if (!headers2.has("Accept")) {
        headers2.set("Accept", "*/*");
      }
      let contentLengthValue = null;
      if (request.body === null && /^(post|put)$/i.test(request.method)) {
        contentLengthValue = "0";
      }
      if (request.body !== null) {
        const totalBytes = getTotalBytes(request);
        if (typeof totalBytes === "number" && !Number.isNaN(totalBytes)) {
          contentLengthValue = String(totalBytes);
        }
      }
      if (contentLengthValue) {
        headers2.set("Content-Length", contentLengthValue);
      }
      if (request.referrerPolicy === "") {
        request.referrerPolicy = DEFAULT_REFERRER_POLICY;
      }
      if (request.referrer && request.referrer !== "no-referrer") {
        request[INTERNALS].referrer = determineRequestsReferrer(request);
      } else {
        request[INTERNALS].referrer = "no-referrer";
      }
      if (request[INTERNALS].referrer instanceof URL) {
        headers2.set("Referer", request.referrer);
      }
      if (!headers2.has("User-Agent")) {
        headers2.set("User-Agent", "node-fetch");
      }
      if (request.compress && !headers2.has("Accept-Encoding")) {
        headers2.set("Accept-Encoding", "gzip,deflate,br");
      }
      let { agent } = request;
      if (typeof agent === "function") {
        agent = agent(parsedURL);
      }
      if (!headers2.has("Connection") && !agent) {
        headers2.set("Connection", "close");
      }
      const search = getSearch(parsedURL);
      const options = {
        path: parsedURL.pathname + search,
        method: request.method,
        headers: headers2[Symbol.for("nodejs.util.inspect.custom")](),
        insecureHTTPParser: request.insecureHTTPParser,
        agent
      };
      return {
        parsedURL,
        options
      };
    };
    AbortError = class extends FetchBaseError {
      constructor(message, type = "aborted") {
        super(message, type);
      }
    };
    supportedSchemas = /* @__PURE__ */ new Set(["data:", "http:", "https:"]);
  }
});

// .svelte-kit/output/server/chunks/index-87d5ee21.js
function run(fn) {
  return fn();
}
function blank_object() {
  return /* @__PURE__ */ Object.create(null);
}
function run_all(fns) {
  fns.forEach(run);
}
function set_current_component(component) {
  current_component = component;
}
function get_current_component() {
  if (!current_component)
    throw new Error("Function called outside component initialization");
  return current_component;
}
function setContext(key2, context) {
  get_current_component().$$.context.set(key2, context);
}
function escape(html) {
  return String(html).replace(/["'&<>]/g, (match) => escaped[match]);
}
function escape_attribute_value(value) {
  return typeof value === "string" ? escape(value) : value;
}
function each(items, fn) {
  let str = "";
  for (let i2 = 0; i2 < items.length; i2 += 1) {
    str += fn(items[i2], i2);
  }
  return str;
}
function validate_component(component, name) {
  if (!component || !component.$$render) {
    if (name === "svelte:component")
      name += " this={...}";
    throw new Error(`<${name}> is not a valid SSR component. You may need to review your build config to ensure that dependencies are compiled, rather than imported as pre-compiled modules`);
  }
  return component;
}
function create_ssr_component(fn) {
  function $$render(result, props, bindings, slots, context) {
    const parent_component = current_component;
    const $$ = {
      on_destroy,
      context: new Map(context || (parent_component ? parent_component.$$.context : [])),
      on_mount: [],
      before_update: [],
      after_update: [],
      callbacks: blank_object()
    };
    set_current_component({ $$ });
    const html = fn(result, props, bindings, slots);
    set_current_component(parent_component);
    return html;
  }
  return {
    render: (props = {}, { $$slots = {}, context = /* @__PURE__ */ new Map() } = {}) => {
      on_destroy = [];
      const result = { title: "", head: "", css: /* @__PURE__ */ new Set() };
      const html = $$render(result, props, {}, $$slots, context);
      run_all(on_destroy);
      return {
        html,
        css: {
          code: Array.from(result.css).map((css4) => css4.code).join("\n"),
          map: null
        },
        head: result.title + result.head
      };
    },
    $$render
  };
}
function add_attribute(name, value, boolean) {
  if (value == null || boolean && !value)
    return "";
  const assignment = boolean && value === true ? "" : `="${escape_attribute_value(value.toString())}"`;
  return ` ${name}${assignment}`;
}
var current_component, escaped, missing_component, on_destroy;
var init_index_87d5ee21 = __esm({
  ".svelte-kit/output/server/chunks/index-87d5ee21.js"() {
    Promise.resolve();
    escaped = {
      '"': "&quot;",
      "'": "&#39;",
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;"
    };
    missing_component = {
      $$render: () => ""
    };
  }
});

// .svelte-kit/output/server/chunks/hooks-1c45ba0b.js
var hooks_1c45ba0b_exports = {};
var init_hooks_1c45ba0b = __esm({
  ".svelte-kit/output/server/chunks/hooks-1c45ba0b.js"() {
  }
});

// .svelte-kit/output/server/entries/pages/__layout.svelte.js
var layout_svelte_exports = {};
__export(layout_svelte_exports, {
  default: () => _layout,
  prerender: () => prerender
});
var navRoutes, NavItem, Nav, Footer, prerender, _layout;
var init_layout_svelte = __esm({
  ".svelte-kit/output/server/entries/pages/__layout.svelte.js"() {
    init_index_87d5ee21();
    navRoutes = [
      {
        label: "home",
        path: "/"
      },
      {
        label: "blog",
        path: "/blog"
      }
    ];
    NavItem = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { route } = $$props;
      const { path, label } = route;
      if ($$props.route === void 0 && $$bindings.route && route !== void 0)
        $$bindings.route(route);
      return `<li><a${add_attribute("href", path, 0)}><div class="${"w-36 rounded py-2 text-center transition-colors hover:bg-stone-600 hover:text-stone-200"}">${escape(label)}</div></a></li>`;
    });
    Nav = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      return `

<nav class="${"mx-auto mb-8 border-b-4 border-stone-700 py-4"}"><ul class="${"flex justify-around"}">${each(navRoutes, (route) => {
        return `${validate_component(NavItem, "NavItem").$$render($$result, { route }, {}, {})}`;
      })}</ul></nav>`;
    });
    Footer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      return `<footer class="${"mt-8 h-4 border-t-2 border-stone-600 pt-4 text-center font-serif text-xs text-stone-600"}"><p>I am keeping all the cookies to myself and you can&#39;t
    have <span class="${"underline"}">any</span>.
  </p>
  <p>This website uses <a target="${"_blank"}" href="${"https://www.goatcounter.com/"}">a very privacy aware analytics tool</a>.
  </p>
  <p class="${"mb-4"}">Do something nice today.</p></footer>`;
    });
    prerender = true;
    _layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      return `${$$result.head += `${$$result.title = `<title>Konstantin Kovar</title>`, ""}`, ""}



<div class="${"min-h-[170vh]"}"><div class="${"left-0 right-0"}"${add_attribute("style", `position: ${"fixed"}; transform: ${"translate(0px)"};`, 0)}><div class="${"relative mx-auto w-11/12 lg:w-2/3 xl:w-1/2 2xl:w-1/3"}">${validate_component(Nav, "Nav").$$render($$result, {}, {}, {})}
      ${slots.default ? slots.default({}) : ``}</div>
    ${validate_component(Footer, "Footer").$$render($$result, {}, {}, {})}</div></div>`;
    });
  }
});

// .svelte-kit/output/server/nodes/0.js
var __exports = {};
__export(__exports, {
  css: () => css,
  entry: () => entry,
  js: () => js,
  module: () => layout_svelte_exports
});
var entry, js, css;
var init__ = __esm({
  ".svelte-kit/output/server/nodes/0.js"() {
    init_layout_svelte();
    entry = "pages/__layout.svelte-54194aaf.js";
    js = ["pages/__layout.svelte-54194aaf.js", "chunks/index-a4305d86.js", "chunks/index-e10c4c74.js"];
    css = ["assets/app-e93b226b.css"];
  }
});

// .svelte-kit/output/server/entries/fallbacks/error.svelte.js
var error_svelte_exports = {};
__export(error_svelte_exports, {
  default: () => Error2,
  load: () => load
});
function load({ error: error2, status }) {
  return { props: { error: error2, status } };
}
var Error2;
var init_error_svelte = __esm({
  ".svelte-kit/output/server/entries/fallbacks/error.svelte.js"() {
    init_index_87d5ee21();
    Error2 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { status } = $$props;
      let { error: error2 } = $$props;
      if ($$props.status === void 0 && $$bindings.status && status !== void 0)
        $$bindings.status(status);
      if ($$props.error === void 0 && $$bindings.error && error2 !== void 0)
        $$bindings.error(error2);
      return `<h1>${escape(status)}</h1>

<pre>${escape(error2.message)}</pre>



${error2.frame ? `<pre>${escape(error2.frame)}</pre>` : ``}
${error2.stack ? `<pre>${escape(error2.stack)}</pre>` : ``}`;
    });
  }
});

// .svelte-kit/output/server/nodes/1.js
var __exports2 = {};
__export(__exports2, {
  css: () => css2,
  entry: () => entry2,
  js: () => js2,
  module: () => error_svelte_exports
});
var entry2, js2, css2;
var init__2 = __esm({
  ".svelte-kit/output/server/nodes/1.js"() {
    init_error_svelte();
    entry2 = "error.svelte-5b50e8ef.js";
    js2 = ["error.svelte-5b50e8ef.js", "chunks/index-a4305d86.js"];
    css2 = [];
  }
});

// .svelte-kit/output/server/entries/pages/2019/01/21/_slug_.svelte.js
var slug_svelte_exports = {};
__export(slug_svelte_exports, {
  default: () => U5Bslugu5D,
  load: () => load2
});
async function load2() {
  return {
    status: 301,
    redirect: "/blog/pythons-most-underrated-game-engine"
  };
}
var U5Bslugu5D;
var init_slug_svelte = __esm({
  ".svelte-kit/output/server/entries/pages/2019/01/21/_slug_.svelte.js"() {
    init_index_87d5ee21();
    U5Bslugu5D = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      return ``;
    });
  }
});

// .svelte-kit/output/server/nodes/2.js
var __exports3 = {};
__export(__exports3, {
  css: () => css3,
  entry: () => entry3,
  js: () => js3,
  module: () => slug_svelte_exports
});
var entry3, js3, css3;
var init__3 = __esm({
  ".svelte-kit/output/server/nodes/2.js"() {
    init_slug_svelte();
    entry3 = "pages/2019/01/21/_slug_.svelte-cb42f40f.js";
    js3 = ["pages/2019/01/21/_slug_.svelte-cb42f40f.js", "chunks/index-a4305d86.js"];
    css3 = [];
  }
});

// .svelte-kit/output/server/chunks/Article-700172e8.js
var Article;
var init_Article_700172e8 = __esm({
  ".svelte-kit/output/server/chunks/Article-700172e8.js"() {
    init_index_87d5ee21();
    Article = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let y;
      return `

<article class="${"prose prose-stone mx-auto mt-4 translate-y-96 prose-code:font-mono prose-code:text-lg prose-code:font-normal before:prose-code:hidden after:prose-code:hidden xl:prose-xl 2xl:prose-2xl"}"${add_attribute("style", `transform: ${`translateY(${450 - y}px)`};`, 0)}>${slots.default ? slots.default({}) : ``}</article>`;
    });
  }
});

// node_modules/clsx/dist/clsx.js
var require_clsx = __commonJS({
  "node_modules/clsx/dist/clsx.js"(exports, module2) {
    function toVal(mix) {
      var k, y, str = "";
      if (typeof mix === "string" || typeof mix === "number") {
        str += mix;
      } else if (typeof mix === "object") {
        if (Array.isArray(mix)) {
          for (k = 0; k < mix.length; k++) {
            if (mix[k]) {
              if (y = toVal(mix[k])) {
                str && (str += " ");
                str += y;
              }
            }
          }
        } else {
          for (k in mix) {
            if (mix[k]) {
              str && (str += " ");
              str += k;
            }
          }
        }
      }
      return str;
    }
    module2.exports = function() {
      var i2 = 0, tmp, x2, str = "";
      while (i2 < arguments.length) {
        if (tmp = arguments[i2++]) {
          if (x2 = toVal(tmp)) {
            str && (str += " ");
            str += x2;
          }
        }
      }
      return str;
    };
  }
});

// .svelte-kit/output/server/chunks/PageHeading-da33bb91.js
var import_clsx, PageHeading;
var init_PageHeading_da33bb91 = __esm({
  ".svelte-kit/output/server/chunks/PageHeading-da33bb91.js"() {
    init_index_87d5ee21();
    import_clsx = __toESM(require_clsx(), 1);
    PageHeading = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { headings } = $$props;
      let { subheadings = [void 0, void 0] } = $$props;
      let { illustration = void 0 } = $$props;
      let longHeadings = headings.some((h2) => h2 && h2.length > 30);
      if ($$props.headings === void 0 && $$bindings.headings && headings !== void 0)
        $$bindings.headings(headings);
      if ($$props.subheadings === void 0 && $$bindings.subheadings && subheadings !== void 0)
        $$bindings.subheadings(subheadings);
      if ($$props.illustration === void 0 && $$bindings.illustration && illustration !== void 0)
        $$bindings.illustration(illustration);
      return `

<div class="${"relative h-52 overflow-hidden"}"><div class="${"relative my-4 h-52 w-full text-center"}"><h1${add_attribute("class", (0, import_clsx.default)("mb-8", longHeadings ? "text-3xl" : "text-6xl"), 0)}>${escape(headings[0] || "")}</h1>
    ${subheadings.some(Boolean) ? `<subtitle class="${"font-serif text-xl italic"}">${escape(subheadings[0] || "")}</subtitle>` : ``}</div>
  ${``}</div>
<div class="${"relative h-56 bg-contain bg-center bg-no-repeat text-red-500"}"${add_attribute("style", `background-image: url('data:image/svg+xml;utf8,${illustration}');`, 0)}></div>`;
    });
  }
});

// .svelte-kit/output/server/chunks/BlogPostLayout-4a47a672.js
var BlogPostLayout;
var init_BlogPostLayout_4a47a672 = __esm({
  ".svelte-kit/output/server/chunks/BlogPostLayout-4a47a672.js"() {
    init_index_87d5ee21();
    init_Article_700172e8();
    init_PageHeading_da33bb91();
    BlogPostLayout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { title } = $$props;
      let { alternateTitle } = $$props;
      let { subtitle } = $$props;
      let { alternateSubtitle } = $$props;
      let { illustration } = $$props;
      if ($$props.title === void 0 && $$bindings.title && title !== void 0)
        $$bindings.title(title);
      if ($$props.alternateTitle === void 0 && $$bindings.alternateTitle && alternateTitle !== void 0)
        $$bindings.alternateTitle(alternateTitle);
      if ($$props.subtitle === void 0 && $$bindings.subtitle && subtitle !== void 0)
        $$bindings.subtitle(subtitle);
      if ($$props.alternateSubtitle === void 0 && $$bindings.alternateSubtitle && alternateSubtitle !== void 0)
        $$bindings.alternateSubtitle(alternateSubtitle);
      if ($$props.illustration === void 0 && $$bindings.illustration && illustration !== void 0)
        $$bindings.illustration(illustration);
      return `${$$result.head += `${$$result.title = `<title>Blog | Konstantin Kovar</title>`, ""}`, ""}

${validate_component(PageHeading, "PageHeading").$$render($$result, {
        headings: [title, alternateTitle],
        subheadings: [subtitle, alternateSubtitle],
        illustration
      }, {}, {})}
${validate_component(Article, "Article").$$render($$result, {}, {}, {
        default: () => {
          return `${slots.default ? slots.default({}) : ``}`;
        }
      })}`;
    });
  }
});

// .svelte-kit/output/server/entries/pages/blog/comparing-tailwind-with-plain-css-is-wrong.md.js
var import_clsx2, metadata, Comparing_tailwind_with_plain_css_is_wrong;
var init_comparing_tailwind_with_plain_css_is_wrong_md = __esm({
  ".svelte-kit/output/server/entries/pages/blog/comparing-tailwind-with-plain-css-is-wrong.md.js"() {
    init_index_87d5ee21();
    init_BlogPostLayout_4a47a672();
    init_Article_700172e8();
    init_PageHeading_da33bb91();
    import_clsx2 = __toESM(require_clsx(), 1);
    metadata = {
      "title": "Don't compare TailwindCSS with CSS",
      "author": "Konstantin <mail@vomkonstant.in>",
      "published": "2022-05-09",
      "illustration": '<svg viewBox="0 0 250 250" fill="none" xmlns="http://www.w3.org/2000/svg"> <g stroke-width="10" stroke-miterlimit="1.5" stroke-linecap="round" stroke-linejoin="round"> <path d="M11.27 89.844c5.437-7.04 11.214-12.512 18.943-16.929 55.62-31.782 87.677 36.25 135.593 50.062 30.354 8.75 73.913-3.376 72.299-42.482" stroke="currentcolor" stroke-width="20.491799999999998"/> <path d="M46.136 139.77c25.21-18.149 44.616-.906 65.137 14.145 26.56 19.479 59 38.254 91.556 19.935" stroke="currentColor" stroke-width="20.491799999999998"/> </g> </svg>'
    };
    Comparing_tailwind_with_plain_css_is_wrong = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      return `${validate_component(BlogPostLayout, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata), {}, {
        default: () => {
          return `<p>A year ago I was teaching web development students about the various approaches to writing and organizing CSS, which is notoriously hard to maintain, in its \u201Cnatural\u201D form. Among the things I was showing was a brief mention of the \u201Catomic CSS\u201D-approach and the fact that TailwindCSS had gained a considerable amount of steam over the last few years. Back then, I was playing it down as a fad, telling them I didn\u2019t understand what all the fuss was about, basically telling them it was unjustified hype.</p>
<p>Fast forward to this semester, when I taught the same course to another class. My view had changed. I told my students, that I now believe there are good chances TailwindCSS will dominate the space for years to come, similar to how Bootstrap had been doing in the mid-2000s.</p>
<h2>Plain CSS is not Tailwind\u2019s competition</h2>
<p>So what changed? During the months in-between I had realized, that the issues I had with Tailwind were invalid. I was comparing it to plain CSS, even though I had not been writing plain CSS - or even SCSS, Less, etc. - outside of my teaching engagements for quite literally <em>years</em>.</p>
<h2>What Tailwind is actually up against</h2>
<p>Joining a ReactJS-legacy project you will quite likely find a stack similar to this:</p>
<ol><li>TypeScript</li>
<li>NextJS</li>
<li>React (duh)</li>
<li>Artifacts of a past Redux integration (\u201Cwe tried to delete it, but when we do it breaks and we don\u2019t know why\u201D)</li>
<li>styled-components or emotionJS</li>
<li>styled-system</li></ol>
<p>Let\u2019s focus on the last two points. These have likely been integrated because keeping extra CSS files for every React component quickly becomes unmaintainable with a growing project. So a decision was made to keep the styles within the component files. Eventually, it turned out to be cumbersome to write a stylesheet for every component in your application. To the rescue comes styled-system, which provides you with reusable components using inline styles via props, comprehensive theming functionality and an intriguingly simple way to write responsive styles.</p>
<h2>Performance-gore</h2>
<p>None of this comes without a cost. The whole convoluted sentence you just decided not to read, is computed <em>at runtime</em> and believe me when I tell you, a peek under styled-system\u2019s hood reveals some treacherous caveats.</p>
<p>So what if we could have all of that power, but none of that runtime overhead? Sounds too good to be true? Well, let\u2019s take a look at how we would replace styled-system code with TailwindCSS in this simple example.</p>
<pre class="${"language-tsx"}"><!-- HTML_TAG_START -->${`<code class="language-tsx"><span class="token keyword">const</span> SomeComponent<span class="token operator">:</span> <span class="token function-variable function">FunctionComponent</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">&#123;</span>children<span class="token punctuation">&#125;</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">(</span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">SomeKindOfGeneralPurposeDiv</span></span>
    <span class="token attr-name">position</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">'</span>absolute<span class="token punctuation">'</span></span>
    <span class="token attr-name">px</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">'</span>md<span class="token punctuation">'</span></span> <span class="token comment">// assuming a theme exsists where this is defined</span>
    <span class="token attr-name">py</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">'</span>sm<span class="token punctuation">'</span></span> <span class="token comment">// assuming a theme exsists where this is defined</span>
    <span class="token attr-name">top</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">'</span>10vh<span class="token punctuation">'</span></span>
    <span class="token attr-name">left</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">'</span>20vw<span class="token punctuation">'</span></span>
    <span class="token attr-name">w</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">'</span>60vw<span class="token punctuation">'</span></span>
  <span class="token punctuation">></span></span><span class="token plain-text">
    </span><span class="token punctuation">&#123;</span>children<span class="token punctuation">&#125;</span><span class="token plain-text">
  </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">SomeKindOfGeneralPurposeDiv</span></span><span class="token punctuation">></span></span><span class="token plain-text">
)
</span></code>`}<!-- HTML_TAG_END --></pre>
<p>These are six props that need to be computed at runtime by the browser\u2019s JavaScript interpreter. If we would use Tailwind, this code would be to the same effect:</p>
<pre class="${"language-tsx"}"><!-- HTML_TAG_START -->${`<code class="language-tsx"><span class="token keyword">const</span> SomeComponent<span class="token operator">:</span> <span class="token function-variable function">FunctionComponent</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">&#123;</span>children<span class="token punctuation">&#125;</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">(</span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span>
    <span class="token attr-name">className</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>
      absolute
      px-8
      py-4
      top-[10vh]
      left-[20vh]
      w-[60vw]
    <span class="token punctuation">"</span></span>
  <span class="token punctuation">></span></span><span class="token plain-text">
    </span><span class="token punctuation">&#123;</span>children<span class="token punctuation">&#125;</span><span class="token plain-text">
  </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span><span class="token plain-text">
)</span></code>`}<!-- HTML_TAG_END --></pre>
<p>As we can see, the ideas at play are the same. In both examples, we</p>
<ul><li>use values defined in our theme/config for the padding</li>
<li>use arbitrary values for the positioning and width</li>
<li>defined all of the styles inline</li></ul>
<h2>Responsiveness</h2>
<p>Let\u2019s take a look at responsive styling. I will just show single lines for brevity. This is how you might change a components margin depending on screen size in styled-system.</p>
<pre class="${"language-tsx"}"><!-- HTML_TAG_START -->${`<code class="language-tsx">  m<span class="token operator">=</span><span class="token punctuation">&#123;</span><span class="token punctuation">&#123;</span>sm<span class="token operator">:</span> <span class="token string">'4px'</span><span class="token punctuation">,</span> md<span class="token operator">:</span> <span class="token string">'8px'</span><span class="token punctuation">,</span> lg<span class="token operator">:</span> <span class="token string">'16px'</span><span class="token punctuation">&#125;</span><span class="token punctuation">&#125;</span></code>`}<!-- HTML_TAG_END --></pre>
<p>Easy enough, but note that added to everything else discussed above, the passed-in object gets created every time this component re-renders. <em>(Strictly speaking, this is a constant value, that should be moved out of the component entirely, defeating the whole point of readable responsive code.)</em></p>
<p>On the other hand, doing the same thing in Tailwind looks very similar, but doesn\u2019t require unnecessary computing when running in the browser:</p>
<pre class="${"language-tsx"}"><!-- HTML_TAG_START -->${`<code class="language-tsx">className <span class="token operator">=</span> <span class="token string">'sm:m-1 md:m-2 lg:m-4'</span></code>`}<!-- HTML_TAG_END --></pre>
<h2>It goes even deeper\u2026</h2>
<p>How would you give a component a hover effect in styled-system or styled-components? Inline CSS, right?</p>
<pre class="${"language-tsx"}"><!-- HTML_TAG_START -->${`<code class="language-tsx"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">RedOnHover</span></span>
  <span class="token attr-name">css</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">&#123;</span>css<span class="token template-string"><span class="token template-punctuation string">&#96;</span><span class="token string">
    &amp;:hover &#123;
      background-color: red;
    &#125;
  </span><span class="token template-punctuation string">&#96;</span></span><span class="token punctuation">&#125;</span></span>
<span class="token punctuation">/></span></span></code>`}<!-- HTML_TAG_END --></pre>
<p>Now if that isn\u2019t some ugly code. Let\u2019s compare this to what tailwind has to offer:</p>
<pre class="${"language-tsx"}"><!-- HTML_TAG_START -->${`<code class="language-tsx"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">className</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>hover:bg-red-500<span class="token punctuation">"</span></span><span class="token punctuation">></span></span></code>`}<!-- HTML_TAG_END --></pre>
<p>The \u201Cbut tailwind is hard to read\u201D argument backfires at this point. Tailwind offers the same principles with most of the other pseudo-selectors and media queries you would normally use: <code>focus</code>, <code>active</code>, <code>visited</code>, <code>first</code>, <code>last</code> and even <code>even</code>. If you are using animations or transitions, there is even a modifier to handle the <code>prefers-reduced-motion</code> media query with <code>motion-reduce</code>.</p>
<h2>\u2026 but it won\u2019t do that</h2>
<p>Inexplicably, Tailwind does not yet support the <code>pointer</code> media query, which I frequently used to enlargen clickable areas for buttons on touch displays. <a href="${"https://github.com/ShiftLimits/tailwindcss-interaction-media"}" rel="${"nofollow"}">There seems to be a plugin in development</a>, but its activity doesn\u2019t stoke confidence.</p>
<p>Aside from this minor nuisance, there are also natural limits to the atomic CSS approach. The one that had the most impact on me (while coding this very blog, actually) is the fact that there is no way to style an element while <em>another</em> element is interacted with. Consider the following SCSS, in which an image gets shown when its sibling text is hovered over.</p>
<pre class="${"language-scss"}"><!-- HTML_TAG_START -->${`<code class="language-scss"><span class="token selector">.image </span><span class="token punctuation">&#123;</span>
  <span class="token property">opacity</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span>

<span class="token selector">.text:hover </span><span class="token punctuation">&#123;</span>
  <span class="token selector"><span class="token parent important">&amp;</span> ~ .image </span><span class="token punctuation">&#123;</span>
    <span class="token property">opacity</span><span class="token punctuation">:</span> 1<span class="token punctuation">;</span>
  <span class="token punctuation">&#125;</span>
<span class="token punctuation">&#125;</span></code>`}<!-- HTML_TAG_END --></pre>
<p>It is not possible to emulate this behavior with atomic classes alone, in fact, whenever we want to express relationships between certain elements, we have to deviate from the atomic CSS principle, by writing custom classes in our entry CSS file and applying those to our elements.</p>
<p><em>Edit 16.05.2022: This might not hold true for much longer, as there is an <a href="${"https://github.com/tailwindlabs/tailwindcss/pull/8299"}" rel="${"nofollow"}">upcoming feature called \u201Carbitrary variants\u201D, which solves this exact issue.</a> I will refactor my custom classes after the feature\u2019s release and share the process on this blog.</em></p>
<h2>Conclusion</h2>
<p>Comparing TailwindCSS to plain CSS or even Sass/SCSS, you might question its benefit. When did you last write plain CSS though? Modern projects often rely on complex, component-based architectures, for which appropriate styling methods have evolved, and have long reigned supreme in the space. When compared to <em>these</em> styling methods, it becomes clear why TailwindCSS has gained such a strong following over the past years.</p>`;
        }
      })}`;
    });
  }
});

// .svelte-kit/output/server/entries/pages/blog/youre-not-just-late-to-crypto.md.js
var import_clsx3, metadata2, Youre_not_just_late_to_crypto;
var init_youre_not_just_late_to_crypto_md = __esm({
  ".svelte-kit/output/server/entries/pages/blog/youre-not-just-late-to-crypto.md.js"() {
    init_index_87d5ee21();
    init_BlogPostLayout_4a47a672();
    init_Article_700172e8();
    init_PageHeading_da33bb91();
    import_clsx3 = __toESM(require_clsx(), 1);
    metadata2 = {
      "title": "You're not just late to crypto, it's already over",
      "alternateTitle": "Scammers and fraudsters have destroyed it",
      "author": "Konstantin <mail@vomkonstant.in>",
      "published": "2022-05-13",
      "illustration": '<svg viewBox="0 0 250 250" fill="none" xmlns="http://www.w3.org/2000/svg"> <g stroke="currentColor" stroke-width="6" stroke-miterlimit="1.5" stroke-linecap="round" stroke-linejoin="round"><path clip-rule="evenodd" d="M188.386 115.61c-12.662 1.936-45.233 6.408-32 27.304-22.24-15.817-25.982 40.57-25.657 44.338-2.032-11.156-7.48-43.078-16.051-47.305-3.486-1.719-9.435 2.664-12.518 4.368 1.357-3.158 4.078-6.756 2.747-10.332-1.13-3.034-6.001-4.287-8.666-5.274-8.09-2.999-16.821-4.357-24.75-7.614 9.984-.621 21.591-4.561 29.306-11.113 4.662-3.959 6.902-10.177 1.238-14.578 17.311 2.86 19.516-10.068 21.278-24.291 1.256-10.136 2.778-20.308 3.77-30.507 1.173 4.062 2.307 8.123 3.335 12.225 3.44 13.717 4.058 44.782 24.714 38.618-8.558 20.986 21.252 21.145 33.254 24.161z" stroke-width="10.71426"/><path d="M74.502 75.103c2.284 2.003 5.628 3.319 8.141 5.058 2.87 1.986 5.76 4.664 8.932 6.15M165.43 83.057c7.457-5.712 14.754-11.866 21.902-17.972M125.511 9.821c.417 5.27.233 10.986 1.46 16.161M52.425 121.71c-11.18.326-22.763 2.825-33.675 5.264M90.032 159.421c-6.358 6.878-11.19 14.789-17.062 22.036M129.484 208.496c.379 10.543 1.933 20.95 1.978 31.541M165.253 154.834c4.955 4.82 11.292 8.123 16.518 12.703M205.566 113.615c8.079-.467 17.843 1.099 25.684-.227" stroke-width="10.71426"/> </g> </svg>'
    };
    Youre_not_just_late_to_crypto = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      return `${validate_component(BlogPostLayout, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata2), {}, {
        default: () => {
          return `<p>Crypto can be a huge source of <a href="${"https://en.wikipedia.org/wiki/Fear_of_missing_out"}" rel="${"nofollow"}">FOMO</a>. If you had only invested in Bitcoin when it was a few cents, you\u2019d be a multimillionaire now.</p>
<p>Naturally, the question arises, whether or not you can still grind out some profit for yourself, by investing right now. After all, there are coins like Doge, Ada or Shib, that would have handsomely multiplied your investment at a much later point in time.</p>
<p>Enthusiasts of the crypto space will tell you that it is still early and broad mainstream adaption is yet to happen, as the technology matures to be safer, cheaper to run and easier to interact with. After all, haven\u2019t we all heard that use cases of blockchain technology are limitless?</p>
<p>I disagree with this. Strongly. While there might be technical and philosophical merit to crypto, which I do believe is the case, the space in which a lucky few have effortlessly acquired immense wealth has - in hindsight quite unsurprisingly - attracted an uncanny amount of scammers, fraudsters and con-artists, that have poisoned the whole ecosystem to a point, where you can safely assume that almost everything that is being pitched or sold to you, is either <a target="${"_blank"}" href="${"https://web3isgoinggreat.com/"}">fraudulent or just stupid.</a></p>
<p>The percentage of projects for people to burn their money in, is surely enough to kill the entire idea of crypto many times over. Additionally, many of the newer iterations of the basic idea of crypto do not add any value to anything, as I expressed <a target="${"_blank"}" href="${"https://brutkasten.com/blockchain-bullshit/"}">in this (German) article back in August of 2016.</a></p>
<p>I argued back then - and I agree with myself now - that while blockchain solved a real problem in that scarce resources and value could not be moved via the internet, there was little actual use outside of that. From what I can tell, this holds true, as I have yet to encounter a project, that uses some kind of token, be it fungible or not, in any meaningful way. Rather, just to sell people digital <a target="${"_blank"}" href="${"https://www.cryptokitties.co/"}">cats</a>, <a target="${"_blank"}" href="${"https://www.crypt-oink.io/webapp/guest"}">pigs</a> and <a target="${"_blank"}" href="${"https://crypko.ai/"}">waifus</a>, preying on their FOMO.</p>`;
        }
      })}`;
    });
  }
});

// .svelte-kit/output/server/entries/pages/blog/pythons-most-underrated-game-engine.md.js
var import_clsx4, metadata3, Pythons_most_underrated_game_engine;
var init_pythons_most_underrated_game_engine_md = __esm({
  ".svelte-kit/output/server/entries/pages/blog/pythons-most-underrated-game-engine.md.js"() {
    init_index_87d5ee21();
    init_BlogPostLayout_4a47a672();
    init_Article_700172e8();
    init_PageHeading_da33bb91();
    import_clsx4 = __toESM(require_clsx(), 1);
    metadata3 = {
      "title": "Python's most underrated game engine for beginners",
      "author": "Konstantin <mail@vomkonstant.in>",
      "published": "2018-11-08",
      "illustration": '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 250 250"> <g stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="1.5" stroke-width="5"><path d="M206.993 80.897c23.523 40.434 5.156 89.568-30.854 118.461-28.994 23.264-84.795 29.399-123-11.86-21.456-23.172-25.306-61.89-12.482-94.75M63.288 58.174c5.754-5.595 12.326-10.479 19.704-14.41 29.815-15.888 72.622-16.661 102.123 6.846" stroke-width="13.8889"/><path d="M160.417 131.78c-2.42 19.089-12.17 37.793-26.951 44.106-22.954 9.803-41.983-16.17-41.192-44.54 23.124-5.06 45.738-4.923 69.019-6.907M70.475 66.462c3.711-5.705 10.545-11.87 16.052-13.49 10.17-2.994 22.457 8.114 20.852 18.527-1.265 8.215-6.785 15.053-11.972 21.199-7.552 8.954-15.662 17.558-24.729 25.005-12.764-9.735-34.317-22.902-37.625-39.852-2.826-14.469 4.854-30.304 21.118-24.914 6.911 2.29 12.098 7.996 16.304 13.525zM178.756 57.654C182.51 51.88 189.427 45.641 195 44.002c10.293-3.031 22.729 8.211 21.104 18.748-1.282 8.316-6.865 15.236-12.115 21.457-7.643 9.063-15.853 17.772-25.028 25.307-12.918-9.852-34.73-23.18-38.08-40.332-2.858-14.645 4.913-30.671 21.375-25.216 6.995 2.317 12.243 8.09 16.5 13.688z" stroke-width="13.8889"/></g> </svg>'
    };
    Pythons_most_underrated_game_engine = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      return `${validate_component(BlogPostLayout, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata3), {}, {
        default: () => {
          return `<p><em>This post has been ported from the old blog and slightly edited on the 13<sup>th</sup> of May 2022.</em></p>
<p>Making games is one of the coolest things you can do with self-taught programming skills. You have complete creative freedom, you don\u2019t have to have a unique and marketable idea and you\u2019re not potentially putting anyone in danger by messing up.</p>
<p>While there are a lot of great game engines out there (my favorite being <a target="${"_blank"}" href="${"https://godotengine.org/"}">Godot</a>), I recently came across an awesome project on GitHub named <a target="${"_blank"}" href="${"https://github.com/kitao/pyxel"}">Pyxel</a>. It is a game engine aiming to enable a quick and easy way to develop games in a retro style.</p>
<p>I have played around with it a little and I was having such a good time playing around with it, that I thought I would write up a small little tutorial about how I coded a quick version of \u201CPong\u201D in just shy of 130 lines of Python.</p>
<h2>What we\u2019re building</h2>
<p>So this version of Pong is a single-player version where one player controls both bats and gets a point every time they hit the ball. Easy enough? Let\u2019s do it.</p>
<p><em>(Screenshot lost during porting, trying to recover.)</em></p>
<h2>Setting up the basics</h2>
<pre class="${"language-py"}"><!-- HTML_TAG_START -->${`<code class="language-py"><span class="token keyword">import</span> pyxel

SCREEN_WIDTH <span class="token operator">=</span> <span class="token number">255</span>
SCREEN_HEIGHT <span class="token operator">=</span> <span class="token number">120</span>

<span class="token keyword">class</span> <span class="token class-name">App</span><span class="token punctuation">:</span>
  <span class="token keyword">def</span> <span class="token function">__init__</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
    pyxel<span class="token punctuation">.</span>init<span class="token punctuation">(</span>SCREEN_WIDTH<span class="token punctuation">,</span> SCREEN_HEIGHT<span class="token punctuation">)</span>
    pyxel<span class="token punctuation">.</span>run<span class="token punctuation">(</span>self<span class="token punctuation">.</span>update<span class="token punctuation">,</span> self<span class="token punctuation">.</span>draw<span class="token punctuation">)</span>

App<span class="token punctuation">(</span><span class="token punctuation">)</span></code>`}<!-- HTML_TAG_END --></pre>
<p>So here we are just wrapping our app in its own class, using Pyxel\u2019s built-in methods to initialize the screen and run the game.</p>
<p>Pyxel\u2019s <code>run()</code>-method takes in two functions as arguments, one that will update the game before every frame and one that will redraw the screen after the changes have been calculated, which I have named accordingly.</p>
<p>So let\u2019s write those methods inside the <code>App</code>:</p>
<pre class="${"language-py"}"><!-- HTML_TAG_START -->${`<code class="language-py"><span class="token keyword">def</span> <span class="token function">update</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
  <span class="token keyword">if</span> pyxel<span class="token punctuation">.</span>btnp<span class="token punctuation">(</span>pyxel<span class="token punctuation">.</span>KEY_Q<span class="token punctuation">)</span><span class="token punctuation">:</span>
    pyxel<span class="token punctuation">.</span>quit<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token keyword">def</span> <span class="token function">draw</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
  pyxel<span class="token punctuation">.</span>cls<span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span></code>`}<!-- HTML_TAG_END --></pre>
<p>Here the <code>update()</code>-method does nothing more - for now -, but to listen for a button press of the \u201CQ\u201D-key and quit the program, when it receives <code>True</code>. The <code>draw()</code>-method uses the built-in <code>cls()</code>-method to clear the screen using the color passed to it (in this case, 0 represents black, Pyxel exposes an enumerated color palette of 16 colors you can view <a href="${"https://github.com/kitao/pyxel"}">in their docs</a>).</p>
<p>Hooray! If we run this script, we should get a black window that does absolutely nothing. Not that exciting, however, you can check if everything is put together correctly by pressing the \u201CQ\u201D-key. If the window closes, everything works as expected.</p>
<h2>Balling</h2>
<p>Arguably the most important game object in Pong is the ball. Let\u2019s write a class for our ball.</p>
<pre class="${"language-py"}"><!-- HTML_TAG_START -->${`<code class="language-py"><span class="token keyword">class</span> <span class="token class-name">Ball</span><span class="token punctuation">:</span>
  <span class="token keyword">def</span> <span class="token function">__init__</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> position<span class="token punctuation">,</span> velocity<span class="token punctuation">)</span><span class="token punctuation">:</span>
    self<span class="token punctuation">.</span>position <span class="token operator">=</span> position
    self<span class="token punctuation">.</span>velocity <span class="token operator">=</span> velocity</code>`}<!-- HTML_TAG_END --></pre>
<p>The ball doesn\u2019t really need any other properties than a position to define where it is and a velocity to define where it is going. So far so good. Let\u2019s make sure our <code>App</code> knows about our <code>Ball</code>: For this purpose we are going to initialize an instance of the <code>Ball</code>, right when the <code>App</code> loads, like so:</p>
<pre class="${"language-py"}"><!-- HTML_TAG_START -->${`<code class="language-py"><span class="token keyword">def</span> <span class="token function">__init__</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
  pyxel<span class="token punctuation">.</span>init<span class="token punctuation">(</span>SCREEN_WIDTH<span class="token punctuation">,</span> SCREEN_HEIGHT<span class="token punctuation">)</span>
  self<span class="token punctuation">.</span>ball <span class="token operator">=</span> Ball<span class="token punctuation">(</span>PLACEHOLDER_POSITION<span class="token punctuation">,</span> PLACEHOLDER_VELOCITY<span class="token punctuation">)</span>
  pyxel<span class="token punctuation">.</span>run<span class="token punctuation">(</span>self<span class="token punctuation">.</span>update<span class="token punctuation">,</span> self<span class="token punctuation">.</span>draw<span class="token punctuation">)</span></code>`}<!-- HTML_TAG_END --></pre>
<p>and in the <code>draw()</code> method, we will make sure a circle is drawn to represent the ball:</p>
<pre class="${"language-py"}"><!-- HTML_TAG_START -->${`<code class="language-py"><span class="token keyword">def</span> <span class="token function">draw</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
  pyxel<span class="token punctuation">.</span>cls<span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span>
  pyxel<span class="token punctuation">.</span>circ<span class="token punctuation">(</span>self<span class="token punctuation">.</span>ball<span class="token punctuation">.</span>position<span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">7</span><span class="token punctuation">)</span></code>`}<!-- HTML_TAG_END --></pre>
<p>Here, 2 is the radius of the circle (aka our <code>Ball</code>) and 7 is the color in which the ball is drawn. Hold on though, Pyxel\u2019s <code>circ()</code> method needs two positional inputs, one for the x-axis (horizontal) and one for the y-axis (vertical). Let\u2019s get onto that.</p>
<h2>Position and Velocity</h2>
<p>On a two-dimensional playing field, you will generally need two values to define the position of an object, one for each dimension (axis).</p>
<p>This is also true for the velocity, you need two values to know in which direction the object is moving, however, the fact that you probably also want to keep control over the speed of the object, makes this a little trickier, so let\u2019s focus on the position for now.</p>
<h3>Position</h3>
<p>Since we will have to manage the position of multiple objects in this project, it makes sense to write a class for those 2D vectors:</p>
<pre class="${"language-py"}"><!-- HTML_TAG_START -->${`<code class="language-py"><span class="token keyword">class</span> <span class="token class-name">Vec2</span><span class="token punctuation">:</span>
  <span class="token keyword">def</span> <span class="token function">__init__</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> x<span class="token punctuation">,</span> y<span class="token punctuation">)</span><span class="token punctuation">:</span>
    self<span class="token punctuation">.</span>x <span class="token operator">=</span> x
    self<span class="token punctuation">.</span>y <span class="token operator">=</span> y</code>`}<!-- HTML_TAG_END --></pre>
<p>Easy enough. Let\u2019s apply this to our <code>Ball</code>:</p>
<pre class="${"language-py"}"><!-- HTML_TAG_START -->${`<code class="language-py"><span class="token keyword">class</span> <span class="token class-name">Ball</span><span class="token punctuation">:</span>
  <span class="token keyword">def</span> <span class="token function">__init__</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> px<span class="token punctuation">,</span> py<span class="token punctuation">,</span> vx<span class="token punctuation">,</span> vy<span class="token punctuation">)</span><span class="token punctuation">:</span>
    self<span class="token punctuation">.</span>position <span class="token operator">=</span> Vec2<span class="token punctuation">(</span>px<span class="token punctuation">,</span> py<span class="token punctuation">)</span>
    self<span class="token punctuation">.</span>velocity <span class="token operator">=</span> Vec2<span class="token punctuation">(</span>vx<span class="token punctuation">,</span> vy<span class="token punctuation">)</span></code>`}<!-- HTML_TAG_END --></pre>
<p>Now, our Ball gets initialized with four values: an <code>x</code> and a <code>y</code> value for each the position and the velocity. Those values are then swiftly turned into <code>Vec2</code>s, so we can easily access the values, i.e. via <code>any_ball.position.x</code>. Let\u2019s make use of that in our <code>App</code>\u2019s <code>draw() </code>method:</p>
<pre class="${"language-py"}"><!-- HTML_TAG_START -->${`<code class="language-py"><span class="token keyword">def</span> draw<span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span> 
  pyxel<span class="token punctuation">.</span>cls<span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span> 
  pyxel<span class="token punctuation">.</span>circ<span class="token punctuation">(</span>
    self<span class="token punctuation">.</span>ball<span class="token punctuation">.</span>position<span class="token punctuation">.</span>x<span class="token punctuation">,</span>
    self<span class="token punctuation">.</span>ball<span class="token punctuation">.</span>position<span class="token punctuation">.</span>y<span class="token punctuation">,</span>
    <span class="token number">2</span><span class="token punctuation">,</span> 
    <span class="token number">7</span>
  <span class="token punctuation">)</span></code>`}<!-- HTML_TAG_END --></pre>
<p>Now let\u2019s properly initiate the <code>Ball</code> in our <code>App</code> by changing the line <code>self.ball = Ball(PLACEHOLDER_POSITION, PLACEHOLDER_VELOCITY)</code> from using the placeholders to something like <code>self.ball = Ball(20, 20, 2, 2)</code>. When you run the script now, you should see your ball, standing there, proudly, 20 pixels from the left and 20 pixels from the top border of the window. It won\u2019t move though, since we haven\u2019t told the <code>Ball</code> what to do with its velocity values yet.</p>
<h3>Velocity</h3>
<p>Now we should give our <code>Ball </code>class its own <code>update</code>()\xA0\`method to make sure it knows what to do with those velocity values:</p>
<pre class="${"language-py"}"><!-- HTML_TAG_START -->${`<code class="language-py"><span class="token keyword">def</span> <span class="token function">update</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
  self<span class="token punctuation">.</span>position<span class="token punctuation">.</span>x <span class="token operator">+=</span> self<span class="token punctuation">.</span>velocity<span class="token punctuation">.</span>x
  self<span class="token punctuation">.</span>position<span class="token punctuation">.</span>y <span class="token operator">+=</span> self<span class="token punctuation">.</span>velocity<span class="token punctuation">.</span>y</code>`}<!-- HTML_TAG_END --></pre>
<p>We now have to call this <code>update()</code> method within our <code>App</code>\u2019s own update method, otherwise, it won\u2019t be called at every frame. So add the line <code>self.ball.update()</code> there (but outside the scope of our existing if-statement). We\u2019re not done though. This will run our ball off the screen, never to be seen again (feel free to try it out). Let\u2019s constrain our ball\u2019s movement by adding two simple rules to the <code>update()</code>-method:</p>
<pre class="${"language-py"}"><!-- HTML_TAG_START -->${`<code class="language-py"><span class="token keyword">if</span> self<span class="token punctuation">.</span>position<span class="token punctuation">.</span>y <span class="token operator">>=</span> SCREEN_HEIGHT <span class="token operator">-</span> <span class="token number">2</span><span class="token punctuation">:</span>
  self<span class="token punctuation">.</span>velocity<span class="token punctuation">.</span>y <span class="token operator">=</span> <span class="token operator">-</span>self<span class="token punctuation">.</span>velocity<span class="token punctuation">.</span>y

<span class="token keyword">if</span> self<span class="token punctuation">.</span>position<span class="token punctuation">.</span>y <span class="token operator">&lt;=</span> <span class="token number">2</span><span class="token punctuation">:</span>
  self<span class="token punctuation">.</span>velocity<span class="token punctuation">.</span>y <span class="token operator">=</span> <span class="token operator">-</span>self<span class="token punctuation">.</span>velocity<span class="token punctuation">.</span>y</code>`}<!-- HTML_TAG_END --></pre>
<p>This makes sure that when the ball hits either the top or the bottom border of the screen, it will change its direction on the y-axis. The number 2 here represents the size of the ball and since this is a value now that we are using repeatedly, we should store it in a variable with something like <code>BALL_SIZE = 2</code>.</p>
<p>We could also add similar rules for the left and right border here, but since touching the left or right border should later end the game, we can omit this here.</p>
<p>At this point, our <code>Ball</code>-class looks like this:</p>
<pre class="${"language-py"}"><!-- HTML_TAG_START -->${`<code class="language-py"><span class="token keyword">class</span> <span class="token class-name">Ball</span><span class="token punctuation">:</span>
  <span class="token keyword">def</span> <span class="token function">__init__</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> px<span class="token punctuation">,</span> py<span class="token punctuation">,</span> vx<span class="token punctuation">,</span> vy<span class="token punctuation">)</span><span class="token punctuation">:</span>
    self<span class="token punctuation">.</span>position <span class="token operator">=</span> Vec2<span class="token punctuation">(</span>px<span class="token punctuation">,</span> py<span class="token punctuation">)</span>
    self<span class="token punctuation">.</span>velocity <span class="token operator">=</span> Vec2<span class="token punctuation">(</span>vx<span class="token punctuation">,</span> vy<span class="token punctuation">)</span>

  <span class="token keyword">def</span> <span class="token function">update</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
    self<span class="token punctuation">.</span>position<span class="token punctuation">.</span>x <span class="token operator">+=</span> self<span class="token punctuation">.</span>velocity<span class="token punctuation">.</span>x
    self<span class="token punctuation">.</span>position<span class="token punctuation">.</span>y <span class="token operator">+=</span> self<span class="token punctuation">.</span>velocity<span class="token punctuation">.</span>y

    <span class="token keyword">if</span> self<span class="token punctuation">.</span>position<span class="token punctuation">.</span>y <span class="token operator">>=</span> SCREEN_HEIGHT <span class="token operator">-</span> BALL_SIZE<span class="token punctuation">:</span>
      self<span class="token punctuation">.</span>velocity<span class="token punctuation">.</span>y <span class="token operator">=</span> <span class="token operator">-</span>self<span class="token punctuation">.</span>velocity<span class="token punctuation">.</span>y

    <span class="token keyword">if</span> self<span class="token punctuation">.</span>position<span class="token punctuation">.</span>y <span class="token operator">&lt;=</span> BALL_SIZE<span class="token punctuation">:</span>
      self<span class="token punctuation">.</span>velocity<span class="token punctuation">.</span>y <span class="token operator">=</span> <span class="token operator">-</span>self<span class="token punctuation">.</span>velocity<span class="token punctuation">.</span>y</code>`}<!-- HTML_TAG_END --></pre>
<p><strong>(Don\u2019t forget to update the <code>App</code>\u2019s <code>draw()</code> method to use the newly created <code>BALL_SIZE</code> constant as well.)</strong></p>
<p>As of right now, we have no control over the ball\u2019s speed other than indirectly via the values we pass at the time of the initialization. This is a problem for two reasons: 1) The speed of the ball will vary based on its angle (I\u2019m not going to go into detail here, but if you want to try it out, you can take the script we have written so far and make some more balls with different velocity values and watch how they behave). 2) If we were to change the speed of the ball (to make it harder as the game goes along for example), we couldn\u2019t easily do so.</p>
<p>To solve this problem, we need to \u2018normalize\u2019 the vector, which means that you figure out a vector\u2019s length, and reduce it to 1. With a vector always having the same length, regardless of its angle, you can then reliably control its speed.</p>
<p>We could include something like a normalize() method in our existing Vec2 class, but for our purposes, I think it\u2019s a better solution to just write another class for normalized 2D vectors. A class that does everything we just discussed would look like this:</p>
<pre class="${"language-py"}"><!-- HTML_TAG_START -->${`<code class="language-py"><span class="token keyword">class</span> <span class="token class-name">Vec2_norm</span><span class="token punctuation">:</span>
  <span class="token keyword">def</span> <span class="token function">__init__</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> x<span class="token punctuation">,</span> y<span class="token punctuation">)</span><span class="token punctuation">:</span>
    self<span class="token punctuation">.</span>magnitude <span class="token operator">=</span> math<span class="token punctuation">.</span>sqrt<span class="token punctuation">(</span>x <span class="token operator">*</span> x <span class="token operator">+</span> y <span class="token operator">*</span> y<span class="token punctuation">)</span> <span class="token comment"># this is how you get the magnitude (length) of a vector</span>
    self<span class="token punctuation">.</span>x <span class="token operator">=</span> x <span class="token operator">/</span> self<span class="token punctuation">.</span>magnitude <span class="token operator">*</span> BALL_SPEED
    self<span class="token punctuation">.</span>y <span class="token operator">=</span> y <span class="token operator">/</span> self<span class="token punctuation">.</span>magnitude <span class="token operator">*</span> BALL_SPEED</code>`}<!-- HTML_TAG_END --></pre>
<p>For this to work we need to do three things: <code>import math</code> at the top of the script, update our <code>Ball</code>\u2019s <code>__init__()</code> method to use the new class like so: <code>self.velocity = Vec2_norm(vx, vy)</code> and create a constant variable <code>BALL_SPEED = 2</code>.</p>
<p>Whew. That was a lot. If you need a break, this would be a great point to take one. Just so we\u2019re on the same page, here is the full script we are having so far:</p>
<pre class="${"language-py"}"><!-- HTML_TAG_START -->${`<code class="language-py"><span class="token keyword">import</span> math
<span class="token keyword">import</span> pyxel

BALL_SIZE <span class="token operator">=</span> <span class="token number">2</span>
BALL_SPEED <span class="token operator">=</span> <span class="token number">2</span>
SCREEN_WIDTH <span class="token operator">=</span> <span class="token number">255</span>
SCREEN_HEIGHT <span class="token operator">=</span> <span class="token number">120</span>

<span class="token keyword">class</span> <span class="token class-name">Vec2</span><span class="token punctuation">:</span>
  <span class="token keyword">def</span> <span class="token function">__init__</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> x<span class="token punctuation">,</span> y<span class="token punctuation">)</span><span class="token punctuation">:</span>
    self<span class="token punctuation">.</span>x <span class="token operator">=</span> x
    self<span class="token punctuation">.</span>y <span class="token operator">=</span> y

<span class="token keyword">class</span> <span class="token class-name">Vec2_norm</span><span class="token punctuation">:</span>
  <span class="token keyword">def</span> <span class="token function">__init__</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> x<span class="token punctuation">,</span> y<span class="token punctuation">)</span><span class="token punctuation">:</span>
    self<span class="token punctuation">.</span>magnitude <span class="token operator">=</span> math<span class="token punctuation">.</span>sqrt<span class="token punctuation">(</span>x <span class="token operator">*</span> x <span class="token operator">+</span> y <span class="token operator">*</span> y<span class="token punctuation">)</span>
    self<span class="token punctuation">.</span>x <span class="token operator">=</span> x <span class="token operator">/</span> self<span class="token punctuation">.</span>magnitude <span class="token operator">*</span> BALL_SPEED
    self<span class="token punctuation">.</span>y <span class="token operator">=</span> y <span class="token operator">/</span> self<span class="token punctuation">.</span>magnitude <span class="token operator">*</span> BALL_SPEED

<span class="token keyword">class</span> <span class="token class-name">Ball</span><span class="token punctuation">:</span>
  <span class="token keyword">def</span> <span class="token function">__init__</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> px<span class="token punctuation">,</span> py<span class="token punctuation">,</span> vx<span class="token punctuation">,</span> vy<span class="token punctuation">)</span><span class="token punctuation">:</span>
    self<span class="token punctuation">.</span>position <span class="token operator">=</span> Vec2<span class="token punctuation">(</span>px<span class="token punctuation">,</span> py<span class="token punctuation">)</span>
    self<span class="token punctuation">.</span>velocity <span class="token operator">=</span> Vec2_norm<span class="token punctuation">(</span>vx<span class="token punctuation">,</span> vy<span class="token punctuation">)</span>

  <span class="token keyword">def</span> <span class="token function">update</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
    self<span class="token punctuation">.</span>position<span class="token punctuation">.</span>x <span class="token operator">+=</span> self<span class="token punctuation">.</span>velocity<span class="token punctuation">.</span>x
    self<span class="token punctuation">.</span>position<span class="token punctuation">.</span>y <span class="token operator">+=</span> self<span class="token punctuation">.</span>velocity<span class="token punctuation">.</span>y

    <span class="token keyword">if</span> self<span class="token punctuation">.</span>position<span class="token punctuation">.</span>y <span class="token operator">>=</span> SCREEN_HEIGHT <span class="token operator">-</span> BALL_SIZE<span class="token punctuation">:</span>
      self<span class="token punctuation">.</span>velocity<span class="token punctuation">.</span>y <span class="token operator">=</span> <span class="token operator">-</span>self<span class="token punctuation">.</span>velocity<span class="token punctuation">.</span>y

    <span class="token keyword">if</span> self<span class="token punctuation">.</span>position<span class="token punctuation">.</span>y <span class="token operator">&lt;=</span> BALL_SIZE<span class="token punctuation">:</span>
      self<span class="token punctuation">.</span>velocity<span class="token punctuation">.</span>y <span class="token operator">=</span> <span class="token operator">-</span>self<span class="token punctuation">.</span>velocity<span class="token punctuation">.</span>y

<span class="token keyword">class</span> <span class="token class-name">App</span><span class="token punctuation">:</span>
  <span class="token keyword">def</span> <span class="token function">__init__</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
    pyxel<span class="token punctuation">.</span>init<span class="token punctuation">(</span>SCREEN_WIDTH<span class="token punctuation">,</span> SCREEN_HEIGHT<span class="token punctuation">)</span>
    self<span class="token punctuation">.</span>ball <span class="token operator">=</span> Ball<span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">,</span> <span class="token number">20</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span>
    pyxel<span class="token punctuation">.</span>run<span class="token punctuation">(</span>self<span class="token punctuation">.</span>update<span class="token punctuation">,</span> self<span class="token punctuation">.</span>draw<span class="token punctuation">)</span>

  <span class="token keyword">def</span> <span class="token function">update</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">if</span> pyxel<span class="token punctuation">.</span>btnp<span class="token punctuation">(</span>pyxel<span class="token punctuation">.</span>KEY_Q<span class="token punctuation">)</span><span class="token punctuation">:</span>
      pyxel<span class="token punctuation">.</span>quit<span class="token punctuation">(</span><span class="token punctuation">)</span>
    self<span class="token punctuation">.</span>ball<span class="token punctuation">.</span>update<span class="token punctuation">(</span><span class="token punctuation">)</span>

  <span class="token keyword">def</span> <span class="token function">draw</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
    pyxel<span class="token punctuation">.</span>cls<span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span>
    pyxel<span class="token punctuation">.</span>circ<span class="token punctuation">(</span>
      self<span class="token punctuation">.</span>ball<span class="token punctuation">.</span>position<span class="token punctuation">.</span>x<span class="token punctuation">,</span>
      self<span class="token punctuation">.</span>ball<span class="token punctuation">.</span>position<span class="token punctuation">.</span>y<span class="token punctuation">,</span>
      BALL_SIZE<span class="token punctuation">,</span>
      <span class="token number">7</span>
    <span class="token punctuation">)</span>

App<span class="token punctuation">(</span><span class="token punctuation">)</span></code>`}<!-- HTML_TAG_END --></pre>
<h2>Batting</h2>
<p>Did you run it, did it work? Cool. Now we\u2019re still missing a crucial part of the game, which is the bats. So let\u2019s implement the steps for the bats, what we already know how to do:</p>
<ol><li>Write a class</li></ol>
<pre class="${"language-py"}"><!-- HTML_TAG_START -->${`<code class="language-py"><span class="token keyword">class</span> <span class="token class-name">Bat</span><span class="token punctuation">:</span>
  <span class="token keyword">def</span> <span class="token function">__init__</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> px<span class="token punctuation">,</span> py<span class="token punctuation">)</span><span class="token punctuation">:</span>
    self<span class="token punctuation">.</span>position <span class="token operator">=</span> Vec2<span class="token punctuation">(</span>px<span class="token punctuation">,</span> py<span class="token punctuation">)</span>
    self<span class="token punctuation">.</span>velocity <span class="token operator">=</span> <span class="token number">0</span></code>`}<!-- HTML_TAG_END --></pre>
<p>We don\u2019t need a vector for the velocity in this case, since the bats will only be moving on one axis and we can also just set it to 0 right away since the bats shouldn\u2019t be moving when the game starts.</p>
<ol><li>Let\u2019s instantiate two bricks with positions on the left and on the right side of the screen in our App, right when it loads:</li></ol>
<pre class="${"language-py"}"><!-- HTML_TAG_START -->${`<code class="language-py"><span class="token keyword">def</span> <span class="token function">__init__</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
  pyxel<span class="token punctuation">.</span>init<span class="token punctuation">(</span>SCREEN_WIDTH<span class="token punctuation">,</span> SCREEN_HEIGHT<span class="token punctuation">)</span>
  self<span class="token punctuation">.</span>ball <span class="token operator">=</span> Ball<span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">,</span> <span class="token number">20</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span>
  self<span class="token punctuation">.</span>bats <span class="token operator">=</span> <span class="token punctuation">[</span>Bat<span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">,</span> Bat<span class="token punctuation">(</span>SCREEN_WIDTH <span class="token operator">-</span> <span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">]</span>
  pyxel<span class="token punctuation">.</span>run<span class="token punctuation">(</span>self<span class="token punctuation">.</span>update<span class="token punctuation">,</span> self<span class="token punctuation">.</span>draw<span class="token punctuation">)</span></code>`}<!-- HTML_TAG_END --></pre>
<ol><li>Let\u2019s draw a rectangle shape in our <code>App</code>\u2019s <code>draw()</code> method for our bats. Let\u2019s also apply what we have learned when making the <code>Ball</code> and set a variable for <code>BAT_SIZE = 8</code> right away.</li></ol>
<pre class="${"language-py"}"><!-- HTML_TAG_START -->${`<code class="language-py"><span class="token keyword">def</span> <span class="token function">draw</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
  pyxel<span class="token punctuation">.</span>cls<span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span>
  pyxel<span class="token punctuation">.</span>circ<span class="token punctuation">(</span>
    self<span class="token punctuation">.</span>ball<span class="token punctuation">.</span>position<span class="token punctuation">.</span>x<span class="token punctuation">,</span>
    self<span class="token punctuation">.</span>ball<span class="token punctuation">.</span>position<span class="token punctuation">.</span>y<span class="token punctuation">,</span>
    BALL_SIZE<span class="token punctuation">,</span>
    <span class="token number">7</span>
  <span class="token punctuation">)</span>
  <span class="token keyword">for</span> bat <span class="token keyword">in</span> self<span class="token punctuation">.</span>bats<span class="token punctuation">:</span>
    pyxel<span class="token punctuation">.</span>rect<span class="token punctuation">(</span>
      bat<span class="token punctuation">.</span>position<span class="token punctuation">.</span>x <span class="token operator">-</span> BAT_SIZE <span class="token operator">/</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token comment"># x-coordinate of top left corner</span>
      bat<span class="token punctuation">.</span>position<span class="token punctuation">.</span>y <span class="token operator">-</span> BAT_SIZE<span class="token punctuation">,</span>     <span class="token comment"># y-coordinate of top left corner</span>
      bat<span class="token punctuation">.</span>position<span class="token punctuation">.</span>x <span class="token operator">+</span> BAT_SIZE <span class="token operator">/</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token comment"># x-coordinate of bottom right corner</span>
      bat<span class="token punctuation">.</span>position<span class="token punctuation">.</span>y <span class="token operator">+</span> BAT_SIZE<span class="token punctuation">,</span>     <span class="token comment"># y-coordinate of bottom right corner</span>
      <span class="token number">7</span>                               <span class="token comment"># fill color</span>
    <span class="token punctuation">)</span></code>`}<!-- HTML_TAG_END --></pre>
<ol><li>In anticipation that this is what we are writing next, let\u2019s call our bats\u2019 <code>update()</code> method inside the <code>App</code>\u2019s own <code>update()</code> method as we did for the ball.</li></ol>
<pre class="${"language-py"}"><!-- HTML_TAG_START -->${`<code class="language-py"><span class="token keyword">def</span> <span class="token function">update</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
  <span class="token keyword">if</span> pyxel<span class="token punctuation">.</span>btnp<span class="token punctuation">(</span>pyxel<span class="token punctuation">.</span>KEY_Q<span class="token punctuation">)</span><span class="token punctuation">:</span>
    pyxel<span class="token punctuation">.</span>quit<span class="token punctuation">(</span><span class="token punctuation">)</span>
  self<span class="token punctuation">.</span>ball<span class="token punctuation">.</span>update<span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token keyword">for</span> bat <span class="token keyword">in</span> self<span class="token punctuation">.</span>bats<span class="token punctuation">:</span>
    bat<span class="token punctuation">.</span>update<span class="token punctuation">(</span><span class="token punctuation">)</span></code>`}<!-- HTML_TAG_END --></pre>
<p>Okay, so now let\u2019s get to that <code>update()</code> method itself.</p>
<p>First, we need to tell it (like the Ball), what to do with its velocity value,
secondly, we want to tell it to change its velocity on button-press</p>
<pre class="${"language-py"}"><!-- HTML_TAG_START -->${`<code class="language-py"><span class="token keyword">if</span> pyxel<span class="token punctuation">.</span>btnp<span class="token punctuation">(</span>pyxel<span class="token punctuation">.</span>KEY_W<span class="token punctuation">)</span><span class="token punctuation">:</span>
  self<span class="token punctuation">.</span>velocity <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">2</span>

<span class="token keyword">if</span> pyxel<span class="token punctuation">.</span>btnp<span class="token punctuation">(</span>pyxel<span class="token punctuation">.</span>KEY_S<span class="token punctuation">)</span><span class="token punctuation">:</span>
  self<span class="token punctuation">.</span>velocity <span class="token operator">=</span> <span class="token number">2</span></code>`}<!-- HTML_TAG_END --></pre>
<p>and third, we want the bats to stop when they hit the top or bottom edge of the screen.</p>
<pre class="${"language-py"}"><!-- HTML_TAG_START -->${`<code class="language-py"><span class="token keyword">if</span> self<span class="token punctuation">.</span>position<span class="token punctuation">.</span>y <span class="token operator">-</span> BAT_SIZE <span class="token operator">&lt;</span> <span class="token number">0</span><span class="token punctuation">:</span>
  self<span class="token punctuation">.</span>position<span class="token punctuation">.</span>y <span class="token operator">=</span> BAT_SIZE
  self<span class="token punctuation">.</span>velocity <span class="token operator">=</span> <span class="token number">0</span>

<span class="token keyword">if</span> self<span class="token punctuation">.</span>position<span class="token punctuation">.</span>y <span class="token operator">+</span> BAT_SIZE <span class="token operator">></span> SCREEN_HEIGHT<span class="token punctuation">:</span>
  self<span class="token punctuation">.</span>position<span class="token punctuation">.</span>y <span class="token operator">=</span> SCREEN_HEIGHT <span class="token operator">-</span> BAT_SIZE
  self<span class="token punctuation">.</span>velocity <span class="token operator">=</span> <span class="token number">0</span></code>`}<!-- HTML_TAG_END --></pre>
<p>If you run the script now, all the pieces are in place, but when we try to hit the ball with the bat, it just passes right through. That\u2019s obviously not what we want. If we were using a more sophisticated game engine, we\u2019d do something like drawing a \u2018hitbox\u2019 around our game objects, or we would make the objects rigid bodies, something of this sort. In Pyxel though, we have to implement this behavior ourselves. Let\u2019s hold on for a second and think about this thoroughly, remember: <strong>think twice, code once.</strong></p>
<h2>Hitting on it</h2>
Okay, so the hitbox is a property of the bats and it should correlate with the drawn rectangle. So it would make sense to have a hitbox attribute in the \`Bat\` class and then draw that hitbox rather than arbitrary values as we are doing right now.
<p>Also, since the hitbox will be a collection of various values, it would be a good idea to write its own class, nothing fancy, something like:</p>
<pre class="${"language-py"}"><!-- HTML_TAG_START -->${`<code class="language-py"><span class="token keyword">class</span> <span class="token class-name">HitBox</span><span class="token punctuation">:</span>
  <span class="token keyword">def</span> <span class="token function">__init__</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> x1<span class="token punctuation">,</span> y1<span class="token punctuation">,</span> x2<span class="token punctuation">,</span> y2<span class="token punctuation">)</span><span class="token punctuation">:</span>
    self<span class="token punctuation">.</span>x1 <span class="token operator">=</span> x1 <span class="token comment"># x-coordinate of top left corner</span>
    self<span class="token punctuation">.</span>y1 <span class="token operator">=</span> y1 <span class="token comment"># y-coordinate of top left corner</span>
    self<span class="token punctuation">.</span>x2 <span class="token operator">=</span> x2 <span class="token comment"># x-coordinate of bottom right corner</span>
    self<span class="token punctuation">.</span>y2 <span class="token operator">=</span> y2 <span class="token comment"># y-coordinate of bottom right corner</span></code>`}<!-- HTML_TAG_END --></pre>
<p>Let\u2019s take a look inside our <code>App</code>\u2019s <code>draw()</code> method:</p>
<pre class="${"language-py"}"><!-- HTML_TAG_START -->${`<code class="language-py"><span class="token keyword">for</span> bat <span class="token keyword">in</span> self<span class="token punctuation">.</span>bats<span class="token punctuation">:</span>
  pyxel<span class="token punctuation">.</span>rect<span class="token punctuation">(</span>
    bat<span class="token punctuation">.</span>position<span class="token punctuation">.</span>x <span class="token operator">-</span> BAT_SIZE <span class="token operator">/</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token comment"># x-coordinate of top left corner</span>
    bat<span class="token punctuation">.</span>position<span class="token punctuation">.</span>y <span class="token operator">-</span> BAT_SIZE<span class="token punctuation">,</span>     <span class="token comment"># y-coordinate of top left corner</span>
    bat<span class="token punctuation">.</span>position<span class="token punctuation">.</span>x <span class="token operator">+</span> BAT_SIZE <span class="token operator">/</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token comment"># x-coordinate of bottom right corner</span>
    bat<span class="token punctuation">.</span>position<span class="token punctuation">.</span>y <span class="token operator">+</span> BAT_SIZE<span class="token punctuation">,</span>     <span class="token comment"># y-coordinate of bottom right corner</span>
    <span class="token number">7</span>                              <span class="token comment"># fill color</span>
  <span class="token punctuation">)</span></code>`}<!-- HTML_TAG_END --></pre>
<p>Let\u2019s cut those calculations and rather use them in our <code>Bat</code> class to instantiate a hitbox:</p>
<pre class="${"language-py"}"><!-- HTML_TAG_START -->${`<code class="language-py"><span class="token keyword">class</span> <span class="token class-name">Bat</span><span class="token punctuation">:</span>
  <span class="token keyword">def</span> <span class="token function">__init__</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> px<span class="token punctuation">,</span> py<span class="token punctuation">)</span><span class="token punctuation">:</span>
    self<span class="token punctuation">.</span>position <span class="token operator">=</span> Vec2<span class="token punctuation">(</span>px<span class="token punctuation">,</span> py<span class="token punctuation">)</span>
    self<span class="token punctuation">.</span>velocity <span class="token operator">=</span> <span class="token number">0</span>
    self<span class="token punctuation">.</span>hitBox <span class="token operator">=</span> HitBox<span class="token punctuation">(</span>
      self<span class="token punctuation">.</span>position<span class="token punctuation">.</span>x <span class="token operator">-</span> BAT_SIZE <span class="token operator">/</span> <span class="token number">4</span><span class="token punctuation">,</span>
      self<span class="token punctuation">.</span>position<span class="token punctuation">.</span>y <span class="token operator">-</span> BAT_SIZE<span class="token punctuation">,</span>
      self<span class="token punctuation">.</span>position<span class="token punctuation">.</span>x <span class="token operator">+</span> BAT_SIZE <span class="token operator">/</span> <span class="token number">4</span><span class="token punctuation">,</span>
      self<span class="token punctuation">.</span>position<span class="token punctuation">.</span>y <span class="token operator">+</span> BAT_SIZE
    <span class="token punctuation">)</span></code>`}<!-- HTML_TAG_END --></pre>
<p>This allows us to use the hitboxes of our bats to draw the rectangles, again in our <code>App</code>\u2019s <code>draw()</code> method, we can simply write:</p>
<pre class="${"language-py"}"><!-- HTML_TAG_START -->${`<code class="language-py"><span class="token keyword">for</span> bat <span class="token keyword">in</span> self<span class="token punctuation">.</span>bats<span class="token punctuation">:</span>
  pyxel<span class="token punctuation">.</span>rect<span class="token punctuation">(</span>
    bat<span class="token punctuation">.</span>hitBox<span class="token punctuation">.</span>x1<span class="token punctuation">,</span>
    bat<span class="token punctuation">.</span>hitBox<span class="token punctuation">.</span>y1<span class="token punctuation">,</span>
    bat<span class="token punctuation">.</span>hitBox<span class="token punctuation">.</span>x2<span class="token punctuation">,</span>
    bat<span class="token punctuation">.</span>hitBox<span class="token punctuation">.</span>y2<span class="token punctuation">,</span>
    <span class="token number">7</span>
  <span class="token punctuation">)</span></code>`}<!-- HTML_TAG_END --></pre>
<p>It might not seem like a huge deal, but this actually means that if we calculate whether or not the ball has been hit by the bat, this will always align with what the user sees on their screen, which is kind of important for obvious reasons.</p>
<p>Before we continue, we have to make sure the hitbox also updates every frame, so we have to update the <code>Bat</code>\u2019s <code>update()</code> method:</p>
<pre class="${"language-py"}"><!-- HTML_TAG_START -->${`<code class="language-py"><span class="token keyword">def</span> <span class="token function">update</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
  self<span class="token punctuation">.</span>position<span class="token punctuation">.</span>y <span class="token operator">+=</span> self<span class="token punctuation">.</span>velocity
  self<span class="token punctuation">.</span>hitBox <span class="token operator">=</span> HitBox<span class="token punctuation">(</span>
    self<span class="token punctuation">.</span>position<span class="token punctuation">.</span>x <span class="token operator">-</span> BAT_SIZE <span class="token operator">/</span> <span class="token number">4</span><span class="token punctuation">,</span>
    self<span class="token punctuation">.</span>position<span class="token punctuation">.</span>y <span class="token operator">-</span> BAT_SIZE<span class="token punctuation">,</span>
    self<span class="token punctuation">.</span>position<span class="token punctuation">.</span>x <span class="token operator">+</span> BAT_SIZE <span class="token operator">/</span> <span class="token number">4</span><span class="token punctuation">,</span>
    self<span class="token punctuation">.</span>position<span class="token punctuation">.</span>y <span class="token operator">+</span> BAT_SIZE
  <span class="token punctuation">)</span></code>`}<!-- HTML_TAG_END --></pre>
<p>Great, so let\u2019s move over and write a simple conditional statement that checks whether or not the position of the ball is inside the bat\u2019s hitbox, and if it is, we want the ball to reverse it\u2019s velocity on the x-axis. This is what I came up with:</p>
<pre class="${"language-py"}"><!-- HTML_TAG_START -->${`<code class="language-py"><span class="token keyword">for</span> bat <span class="token keyword">in</span> self<span class="token punctuation">.</span>bats<span class="token punctuation">:</span>
  bat<span class="token punctuation">.</span>update<span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>bat<span class="token punctuation">.</span>hitBox<span class="token punctuation">.</span>x1 <span class="token operator">&lt;</span> self<span class="token punctuation">.</span>ball<span class="token punctuation">.</span>position<span class="token punctuation">.</span>x <span class="token operator">&lt;</span> bat<span class="token punctuation">.</span>hitBox<span class="token punctuation">.</span>x2
  <span class="token keyword">and</span> bat<span class="token punctuation">.</span>hitBox<span class="token punctuation">.</span>y1 <span class="token operator">&lt;</span> self<span class="token punctuation">.</span>ball<span class="token punctuation">.</span>position<span class="token punctuation">.</span>y <span class="token operator">&lt;</span> bat<span class="token punctuation">.</span>hitBox<span class="token punctuation">.</span>y2<span class="token punctuation">)</span><span class="token punctuation">:</span>
    self<span class="token punctuation">.</span>ball<span class="token punctuation">.</span>velocity<span class="token punctuation">.</span>x <span class="token operator">=</span> <span class="token operator">-</span>self<span class="token punctuation">.</span>ball<span class="token punctuation">.</span>velocity<span class="token punctuation">.</span>x</code>`}<!-- HTML_TAG_END --></pre>
<p><strong>(If you spot a problem with this right away, you would be right, if not, I\u2019m revisiting this in the last segment as an opportunity to debug the script, for now though, this does what it\u2019s supposed to do.)</strong></p>
<h2>Scoring and losing</h2>
<p>The game works! Let\u2019s implement the score and the loss condition: For the loss condition, we just check for the ball\u2019s position on the x-axis and if it\u2019s below 0 or farther right than the screen width, the game is over. For the score, we initiate the <code>App</code> with a <code>score</code> attribute of 0. Now every time the ball hits a bat, we increment the score by 1. After those small changes, the <code>App</code>\u2019s <code>update()</code> method should look like this:</p>
<pre class="${"language-py"}"><!-- HTML_TAG_START -->${`<code class="language-py"><span class="token keyword">def</span> <span class="token function">update</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
  <span class="token keyword">if</span> pyxel<span class="token punctuation">.</span>btnp<span class="token punctuation">(</span>pyxel<span class="token punctuation">.</span>KEY_Q<span class="token punctuation">)</span><span class="token punctuation">:</span>
    pyxel<span class="token punctuation">.</span>quit<span class="token punctuation">(</span><span class="token punctuation">)</span>
  self<span class="token punctuation">.</span>ball<span class="token punctuation">.</span>update<span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token keyword">for</span> bat <span class="token keyword">in</span> self<span class="token punctuation">.</span>bats<span class="token punctuation">:</span>
    bat<span class="token punctuation">.</span>update<span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>bat<span class="token punctuation">.</span>hitBox<span class="token punctuation">.</span>x1 <span class="token operator">&lt;</span> self<span class="token punctuation">.</span>ball<span class="token punctuation">.</span>position<span class="token punctuation">.</span>x <span class="token operator">&lt;</span> bat<span class="token punctuation">.</span>hitBox<span class="token punctuation">.</span>x2
    <span class="token keyword">and</span> bat<span class="token punctuation">.</span>hitBox<span class="token punctuation">.</span>y1 <span class="token operator">&lt;</span> self<span class="token punctuation">.</span>ball<span class="token punctuation">.</span>position<span class="token punctuation">.</span>y <span class="token operator">&lt;</span> bat<span class="token punctuation">.</span>hitBox<span class="token punctuation">.</span>y2<span class="token punctuation">)</span><span class="token punctuation">:</span>
      self<span class="token punctuation">.</span>ball<span class="token punctuation">.</span>velocity<span class="token punctuation">.</span>x <span class="token operator">=</span> <span class="token operator">-</span>self<span class="token punctuation">.</span>ball<span class="token punctuation">.</span>velocity<span class="token punctuation">.</span>x
      self<span class="token punctuation">.</span>score <span class="token operator">+=</span> <span class="token number">1</span>
  <span class="token keyword">if</span> self<span class="token punctuation">.</span>ball<span class="token punctuation">.</span>position<span class="token punctuation">.</span>x <span class="token operator">>=</span> SCREEN_WIDTH <span class="token operator">-</span> BALL_SIZE<span class="token punctuation">:</span>
    pyxel<span class="token punctuation">.</span>quit<span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token keyword">if</span> self<span class="token punctuation">.</span>ball<span class="token punctuation">.</span>position<span class="token punctuation">.</span>x <span class="token operator">&lt;=</span> BALL_SIZE<span class="token punctuation">:</span>
    pyxel<span class="token punctuation">.</span>quit<span class="token punctuation">(</span><span class="token punctuation">)</span></code>`}<!-- HTML_TAG_END --></pre>
<p>Finally, let\u2019s give the user some feedback on his score, by including the score as text on the screen. Inside the <code>App</code>\u2019s <code>draw()</code> method, let\u2019s insert:</p>
<pre class="${"language-py"}"><!-- HTML_TAG_START -->${`<code class="language-py">pyxel<span class="token punctuation">.</span>text<span class="token punctuation">(</span>
  SCREEN_WIDTH <span class="token operator">/</span> <span class="token number">2</span><span class="token punctuation">,</span>   <span class="token comment"># x-position of the text</span>
  SCREEN_HEIGHT <span class="token operator">/</span> <span class="token number">12</span><span class="token punctuation">,</span> <span class="token comment"># y position of the text</span>
  <span class="token builtin">str</span><span class="token punctuation">(</span>self<span class="token punctuation">.</span>score<span class="token punctuation">)</span><span class="token punctuation">,</span>    <span class="token comment"># displayed text as string</span>
  <span class="token number">7</span>                   <span class="token comment"># text color</span>
<span class="token punctuation">)</span></code>`}<!-- HTML_TAG_END --></pre>
<p>And that\u2019s it! The game is working and is eager to be played. In case you went off the road somewhere and need help finding back, here is everything we just did, as a whole:</p>
<pre class="${"language-py"}"><!-- HTML_TAG_START -->${`<code class="language-py"><span class="token keyword">import</span> math
<span class="token keyword">import</span> pyxel

BALL_SIZE <span class="token operator">=</span> <span class="token number">2</span>
BALL_SPEED <span class="token operator">=</span> <span class="token number">2</span>
BAT_SIZE <span class="token operator">=</span> <span class="token number">8</span>
SCREEN_WIDTH <span class="token operator">=</span> <span class="token number">255</span>
SCREEN_HEIGHT <span class="token operator">=</span> <span class="token number">120</span>

<span class="token keyword">class</span> <span class="token class-name">Vec2</span><span class="token punctuation">:</span>
  <span class="token keyword">def</span> <span class="token function">__init__</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> x<span class="token punctuation">,</span> y<span class="token punctuation">)</span><span class="token punctuation">:</span>
    self<span class="token punctuation">.</span>x <span class="token operator">=</span> x
    self<span class="token punctuation">.</span>y <span class="token operator">=</span> y

<span class="token keyword">class</span> <span class="token class-name">Vec2_norm</span><span class="token punctuation">:</span>
  <span class="token keyword">def</span> <span class="token function">__init__</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> x<span class="token punctuation">,</span> y<span class="token punctuation">)</span><span class="token punctuation">:</span>
    self<span class="token punctuation">.</span>magnitude <span class="token operator">=</span> math<span class="token punctuation">.</span>sqrt<span class="token punctuation">(</span>x <span class="token operator">*</span> x <span class="token operator">+</span> y <span class="token operator">*</span> y<span class="token punctuation">)</span>
    self<span class="token punctuation">.</span>x <span class="token operator">=</span> x <span class="token operator">/</span> self<span class="token punctuation">.</span>magnitude <span class="token operator">*</span> BALL_SPEED
    self<span class="token punctuation">.</span>y <span class="token operator">=</span> y <span class="token operator">/</span> self<span class="token punctuation">.</span>magnitude <span class="token operator">*</span> BALL_SPEED

<span class="token keyword">class</span> <span class="token class-name">HitBox</span><span class="token punctuation">:</span>
  <span class="token keyword">def</span> <span class="token function">__init__</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> x1<span class="token punctuation">,</span> y1<span class="token punctuation">,</span> x2<span class="token punctuation">,</span> y2<span class="token punctuation">)</span><span class="token punctuation">:</span>
    self<span class="token punctuation">.</span>x1 <span class="token operator">=</span> x1 <span class="token comment"># x-coordinate of top left corner</span>
    self<span class="token punctuation">.</span>y1 <span class="token operator">=</span> y1 <span class="token comment"># y-coordinate of top left corner</span>
    self<span class="token punctuation">.</span>x2 <span class="token operator">=</span> x2 <span class="token comment"># x-coordinate of bottom right corner</span>
    self<span class="token punctuation">.</span>y2 <span class="token operator">=</span> y2 <span class="token comment"># y-coordinate of bottom right corner</span>

<span class="token keyword">class</span> <span class="token class-name">Ball</span><span class="token punctuation">:</span>
  <span class="token keyword">def</span> <span class="token function">__init__</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> px<span class="token punctuation">,</span> py<span class="token punctuation">,</span> vx<span class="token punctuation">,</span> vy<span class="token punctuation">)</span><span class="token punctuation">:</span>
    self<span class="token punctuation">.</span>position <span class="token operator">=</span> Vec2<span class="token punctuation">(</span>px<span class="token punctuation">,</span> py<span class="token punctuation">)</span>
    self<span class="token punctuation">.</span>velocity <span class="token operator">=</span> Vec2_norm<span class="token punctuation">(</span>vx<span class="token punctuation">,</span> vy<span class="token punctuation">)</span>

  <span class="token keyword">def</span> <span class="token function">update</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
    self<span class="token punctuation">.</span>position<span class="token punctuation">.</span>x <span class="token operator">+=</span> self<span class="token punctuation">.</span>velocity<span class="token punctuation">.</span>x
    self<span class="token punctuation">.</span>position<span class="token punctuation">.</span>y <span class="token operator">+=</span> self<span class="token punctuation">.</span>velocity<span class="token punctuation">.</span>y

    <span class="token keyword">if</span> self<span class="token punctuation">.</span>position<span class="token punctuation">.</span>y <span class="token operator">>=</span> SCREEN_HEIGHT <span class="token operator">-</span> BALL_SIZE<span class="token punctuation">:</span>
      self<span class="token punctuation">.</span>velocity<span class="token punctuation">.</span>y <span class="token operator">=</span> <span class="token operator">-</span>self<span class="token punctuation">.</span>velocity<span class="token punctuation">.</span>y

    <span class="token keyword">if</span> self<span class="token punctuation">.</span>position<span class="token punctuation">.</span>y <span class="token operator">&lt;=</span> BALL_SIZE<span class="token punctuation">:</span>
      self<span class="token punctuation">.</span>velocity<span class="token punctuation">.</span>y <span class="token operator">=</span> <span class="token operator">-</span>self<span class="token punctuation">.</span>velocity<span class="token punctuation">.</span>y

<span class="token keyword">class</span> <span class="token class-name">Bat</span><span class="token punctuation">:</span>
  <span class="token keyword">def</span> <span class="token function">__init__</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> px<span class="token punctuation">,</span> py<span class="token punctuation">)</span><span class="token punctuation">:</span>
    self<span class="token punctuation">.</span>position <span class="token operator">=</span> Vec2<span class="token punctuation">(</span>px<span class="token punctuation">,</span> py<span class="token punctuation">)</span>
    self<span class="token punctuation">.</span>velocity <span class="token operator">=</span> <span class="token number">0</span>
    self<span class="token punctuation">.</span>hitBox <span class="token operator">=</span> HitBox<span class="token punctuation">(</span>
      self<span class="token punctuation">.</span>position<span class="token punctuation">.</span>x <span class="token operator">-</span> BAT_SIZE <span class="token operator">/</span> <span class="token number">4</span><span class="token punctuation">,</span>
      self<span class="token punctuation">.</span>position<span class="token punctuation">.</span>y <span class="token operator">-</span> BAT_SIZE<span class="token punctuation">,</span>
      self<span class="token punctuation">.</span>position<span class="token punctuation">.</span>x <span class="token operator">+</span> BAT_SIZE <span class="token operator">/</span> <span class="token number">4</span><span class="token punctuation">,</span>
      self<span class="token punctuation">.</span>position<span class="token punctuation">.</span>y <span class="token operator">+</span> BAT_SIZE
    <span class="token punctuation">)</span>

  <span class="token keyword">def</span> <span class="token function">update</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
    self<span class="token punctuation">.</span>position<span class="token punctuation">.</span>y <span class="token operator">+=</span> self<span class="token punctuation">.</span>velocity
    self<span class="token punctuation">.</span>hitBox <span class="token operator">=</span> HitBox<span class="token punctuation">(</span>
      self<span class="token punctuation">.</span>position<span class="token punctuation">.</span>x <span class="token operator">-</span> BAT_SIZE <span class="token operator">/</span> <span class="token number">4</span><span class="token punctuation">,</span>
      self<span class="token punctuation">.</span>position<span class="token punctuation">.</span>y <span class="token operator">-</span> BAT_SIZE<span class="token punctuation">,</span>
      self<span class="token punctuation">.</span>position<span class="token punctuation">.</span>x <span class="token operator">+</span> BAT_SIZE <span class="token operator">/</span> <span class="token number">4</span><span class="token punctuation">,</span>
      self<span class="token punctuation">.</span>position<span class="token punctuation">.</span>y <span class="token operator">+</span> BAT_SIZE
    <span class="token punctuation">)</span>

    <span class="token keyword">if</span> pyxel<span class="token punctuation">.</span>btnp<span class="token punctuation">(</span>pyxel<span class="token punctuation">.</span>KEY_W<span class="token punctuation">)</span><span class="token punctuation">:</span>
      self<span class="token punctuation">.</span>velocity <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">2</span>

    <span class="token keyword">if</span> pyxel<span class="token punctuation">.</span>btnp<span class="token punctuation">(</span>pyxel<span class="token punctuation">.</span>KEY_S<span class="token punctuation">)</span><span class="token punctuation">:</span>
      self<span class="token punctuation">.</span>velocity <span class="token operator">=</span> <span class="token number">2</span>

    <span class="token keyword">if</span> self<span class="token punctuation">.</span>position<span class="token punctuation">.</span>y <span class="token operator">-</span> BAT_SIZE <span class="token operator">&lt;</span> <span class="token number">0</span><span class="token punctuation">:</span>
      self<span class="token punctuation">.</span>position<span class="token punctuation">.</span>y <span class="token operator">=</span> BAT_SIZE
      self<span class="token punctuation">.</span>velocity <span class="token operator">=</span> <span class="token number">0</span>

    <span class="token keyword">if</span> self<span class="token punctuation">.</span>position<span class="token punctuation">.</span>y <span class="token operator">+</span> BAT_SIZE <span class="token operator">></span> SCREEN_HEIGHT<span class="token punctuation">:</span>
      self<span class="token punctuation">.</span>position<span class="token punctuation">.</span>y <span class="token operator">=</span> SCREEN_HEIGHT <span class="token operator">-</span> BAT_SIZE
      self<span class="token punctuation">.</span>velocity <span class="token operator">=</span> <span class="token number">0</span>

<span class="token keyword">class</span> <span class="token class-name">App</span><span class="token punctuation">:</span>
  <span class="token keyword">def</span> <span class="token function">__init__</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
    pyxel<span class="token punctuation">.</span>init<span class="token punctuation">(</span>SCREEN_WIDTH<span class="token punctuation">,</span> SCREEN_HEIGHT<span class="token punctuation">)</span>
    self<span class="token punctuation">.</span>ball <span class="token operator">=</span> Ball<span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">,</span> <span class="token number">20</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span>
    self<span class="token punctuation">.</span>bats <span class="token operator">=</span> <span class="token punctuation">[</span>Bat<span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">,</span> Bat<span class="token punctuation">(</span>SCREEN_WIDTH <span class="token operator">-</span> <span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">]</span>
    self<span class="token punctuation">.</span>score <span class="token operator">=</span> <span class="token number">0</span>
    pyxel<span class="token punctuation">.</span>run<span class="token punctuation">(</span>self<span class="token punctuation">.</span>update<span class="token punctuation">,</span> self<span class="token punctuation">.</span>draw<span class="token punctuation">)</span>

  <span class="token keyword">def</span> <span class="token function">update</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">if</span> pyxel<span class="token punctuation">.</span>btnp<span class="token punctuation">(</span>pyxel<span class="token punctuation">.</span>KEY_Q<span class="token punctuation">)</span><span class="token punctuation">:</span>
      pyxel<span class="token punctuation">.</span>quit<span class="token punctuation">(</span><span class="token punctuation">)</span>
    self<span class="token punctuation">.</span>ball<span class="token punctuation">.</span>update<span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">for</span> bat <span class="token keyword">in</span> self<span class="token punctuation">.</span>bats<span class="token punctuation">:</span>
      bat<span class="token punctuation">.</span>update<span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>bat<span class="token punctuation">.</span>hitBox<span class="token punctuation">.</span>x1 <span class="token operator">&lt;</span> self<span class="token punctuation">.</span>ball<span class="token punctuation">.</span>position<span class="token punctuation">.</span>x <span class="token operator">&lt;</span> bat<span class="token punctuation">.</span>hitBox<span class="token punctuation">.</span>x2
      <span class="token keyword">and</span> bat<span class="token punctuation">.</span>hitBox<span class="token punctuation">.</span>y1 <span class="token operator">&lt;</span> self<span class="token punctuation">.</span>ball<span class="token punctuation">.</span>position<span class="token punctuation">.</span>y <span class="token operator">&lt;</span> bat<span class="token punctuation">.</span>hitBox<span class="token punctuation">.</span>y2<span class="token punctuation">)</span><span class="token punctuation">:</span>
        self<span class="token punctuation">.</span>ball<span class="token punctuation">.</span>velocity<span class="token punctuation">.</span>x <span class="token operator">=</span> <span class="token operator">-</span>self<span class="token punctuation">.</span>ball<span class="token punctuation">.</span>velocity<span class="token punctuation">.</span>x
        self<span class="token punctuation">.</span>score <span class="token operator">+=</span> <span class="token number">1</span>
    <span class="token keyword">if</span> self<span class="token punctuation">.</span>ball<span class="token punctuation">.</span>position<span class="token punctuation">.</span>x <span class="token operator">>=</span> SCREEN_WIDTH <span class="token operator">-</span> BALL_SIZE<span class="token punctuation">:</span>
      pyxel<span class="token punctuation">.</span>quit<span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">if</span> self<span class="token punctuation">.</span>ball<span class="token punctuation">.</span>position<span class="token punctuation">.</span>x <span class="token operator">&lt;=</span> BALL_SIZE<span class="token punctuation">:</span>
      pyxel<span class="token punctuation">.</span>quit<span class="token punctuation">(</span><span class="token punctuation">)</span>

  <span class="token keyword">def</span> <span class="token function">draw</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
    pyxel<span class="token punctuation">.</span>cls<span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span>
    pyxel<span class="token punctuation">.</span>circ<span class="token punctuation">(</span>
      self<span class="token punctuation">.</span>ball<span class="token punctuation">.</span>position<span class="token punctuation">.</span>x<span class="token punctuation">,</span>
      self<span class="token punctuation">.</span>ball<span class="token punctuation">.</span>position<span class="token punctuation">.</span>y<span class="token punctuation">,</span>
      BALL_SIZE<span class="token punctuation">,</span>
      <span class="token number">7</span>
    <span class="token punctuation">)</span>
    <span class="token keyword">for</span> bat <span class="token keyword">in</span> self<span class="token punctuation">.</span>bats<span class="token punctuation">:</span>
      pyxel<span class="token punctuation">.</span>rect<span class="token punctuation">(</span>
        bat<span class="token punctuation">.</span>hitBox<span class="token punctuation">.</span>x1<span class="token punctuation">,</span>
        bat<span class="token punctuation">.</span>hitBox<span class="token punctuation">.</span>y1<span class="token punctuation">,</span>
        bat<span class="token punctuation">.</span>hitBox<span class="token punctuation">.</span>x2<span class="token punctuation">,</span>
        bat<span class="token punctuation">.</span>hitBox<span class="token punctuation">.</span>y2<span class="token punctuation">,</span>
        <span class="token number">7</span>
      <span class="token punctuation">)</span>
    pyxel<span class="token punctuation">.</span>text<span class="token punctuation">(</span>
      SCREEN_WIDTH <span class="token operator">/</span> <span class="token number">2</span><span class="token punctuation">,</span>
      SCREEN_HEIGHT <span class="token operator">/</span> <span class="token number">12</span><span class="token punctuation">,</span>
      <span class="token builtin">str</span><span class="token punctuation">(</span>self<span class="token punctuation">.</span>score<span class="token punctuation">)</span><span class="token punctuation">,</span>
      <span class="token number">7</span>
    <span class="token punctuation">)</span>

App<span class="token punctuation">(</span><span class="token punctuation">)</span></code>`}<!-- HTML_TAG_END --></pre>
<h2>Where to go from here</h2>
<p>Alright, a very basic version of the game is done, but let\u2019s be honest, it could be more exciting. Here are some suggestions about how to improve the game, that you can try on your own:</p>
<ul><li>To make the game less predictable, let\u2019s change the ball\u2019s angle with which he bounces back from the bat by a small random value. Hint: you will probably want to <code>from random import uniform</code> for this one.<ul><li>More advanced: Make the angle change based on the position of the ball relative to the position of the bat at the time of contact.</li></ul></li>
<li>Make the game harder as it goes along, maybe increase the ball speed a little every 5 points (it isn\u2019t technically necessary, but it would be good practice to rename the <code>BALL_SPEED</code> variable to <code>ball_speed</code>, since all-cap variable names generally indicate constants).</li>
<li>Use different color schemes. Maybe even change colors dynamically throughout the game (to indicate an increase in ball speed for example).</li>
<li>There is a bug, that when the ball enters the bat from the bottom or top rather than the side, it will get kind of stuck there, maybe you can figure out what the problem is and fix it?</li></ul>
<hr>
<p>Edit: Stepping every aspect of this tutorial up (and adding some new ones): Check out this project on GitHub: <a target="${"_blank"}" href="${"https://github.com/timbledum/asteroids"}">github.com/timbledum/asteroids</a>
If you want to level up, examining this very well written and commented repository would be well-invested time.</p>`;
        }
      })}`;
    });
  }
});

// .svelte-kit/output/server/entries/pages/blog/pythons-most-underrated-game-engine-2.md.js
var import_clsx5, metadata4, Pythons_most_underrated_game_engine_2;
var init_pythons_most_underrated_game_engine_2_md = __esm({
  ".svelte-kit/output/server/entries/pages/blog/pythons-most-underrated-game-engine-2.md.js"() {
    init_index_87d5ee21();
    init_BlogPostLayout_4a47a672();
    init_Article_700172e8();
    init_PageHeading_da33bb91();
    import_clsx5 = __toESM(require_clsx(), 1);
    metadata4 = {
      "title": "After Pong Ends",
      "alternateSubtitle": `Part 2 of "Python's most underrated game engine for beginners`,
      "author": "Konstantin <mail@vomkonstant.in>",
      "published": "2019-01-19",
      "illustration": '<svg viewBox="0 0 250 250" fill="none" xmlns="http://www.w3.org/2000/svg"> <g stroke="currentColor"> <path d="M25 195.048c0-.903 1.306-1.3 1.695-2.115.089-.189 1.369-2.83 1.61-2.75 1.094.365 2.962 4.112 3.611 5.111.075.114 1.354 2.037 1.445 1.916 2.428-3.238 1.174-9.757 4.138-12.72.443-.443.635 1.08.971 1.61.174.273 3.394 2.287 3.5 2.14.71-.993 1.891-7.563 4.166-6.806 1.83.61 3.845 5.96 4.25 7.5.068.257 1.16 3.788 1.556 3.472 3.122-2.498 2.886-6.793 3.61-10.416 1.227-6.133 2.111-15.104 5.083-20.553.402-.737 4.14-3.45 4.75-3.084 1.675 1.006 3.609 5.502 5.693 1.334 1.45-2.899 4.684-9.488 4.833-12.471.05-1.007.533-4.693 2.028-4.444 3.622.604 4.92 6.355 6.165 9.11 4.055 8.979 6.373 18.608 10.61 27.386 1.331 2.757 2.05 5.952 3.111 8.833.167.45 1.11 3.009 1.89 2.749 2.237-.746 3.327-9.56 4.47-11.72 6.7-12.654 11.67-26.623 16.22-40.274.284-.852.573-3.457.7-4.337.585-4.027.8-8.594 2.052-12.483.19-.594 1.195-4.368 1.94-4.301 2.59.236 1.963 5.492 3.551 6.55.152.102.77-3.646.86-4.124.462-2.42 1.331-1.368 2.316-1.368.931 0 1 3.625 1.5 4.125.7.7 2.321-.645 2.624-.088.227.415 1.594 5.43 1.875 5.36.574-.144.878-1.826 1.743-1.566.358.108 1.363 2.687 1.742 2.404.545-.41.491-2.801.728-3.485 1.22-3.54 2.552-6.904 4.036-10.366.25-.585 1.7 4.065 2.073 1.456.055-.386.126-.765.198-1.147.63-3.3.657-7.047 2.052-10.145.22-.489.567-2.543 1.08-2.713 1.18-.393 2.666 6.184 3.066 7.234.057.151.954 2.224 1.059 2.16 1.126-.675.726-2.44.683-3.484-.116-2.857-.285-5.675.177-8.513.036-.22.484-3.59.882-3.44.751.28 1.071 2.205 1.257 2.823.82 2.73 1.502 5.5 2.404 8.204 2.736 8.208 3.553 17.308 6.682 25.276.737 1.872 1.373 3.79 2.207 5.623.06.133.734 1.552.881 1.478.505-.252-.128-1.976.331-2.206.042-.02.504 1.035.573 1.125.528.679 1.061 1.343 1.522 2.073.21.332.595 1.407.595 1.015.542.902 1.038.45 1.358-.09.788-1.33.992-3.038 1.271-4.526.888-4.733 1.954-9.12 2.489-13.922.745-6.71 2.869-12.716 4.207-19.216.823-3.993.428-7.79 1.854-11.75 1.084-3.013 1.618-7.68 3.943-10.005.063-.063 1.966 5.483 2.462 5.929.719.647 1.88-2.486 2.487-1.88 1.32 1.322 1.78 4.426 2.382 6.115 1.543 4.333 2.84 8.812 4.711 13.022.025.054.427-.812.477-.921.39-.864.742-1.747 1.132-2.611.932-2.061 3.322-3.87 3.794-6.01 1.635-7.426 3.087-15.224 5.879-22.44.192-.498.968.01 1.444-.24 2.713-1.43 2.405 2.244 3.745 4.7.2.366 1.234 4.043 1.65 3.705 1.504-1.221 1.79-5.813 2.259-7.588 1.925-7.283 3.977-14.1 3.75-21.768" stroke-width="8.3333" stroke-miterlimit="1.5" stroke-linecap="round" stroke-linejoin="round"> </path> </g> </svg>'
    };
    Pythons_most_underrated_game_engine_2 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      return `${validate_component(BlogPostLayout, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata4), {}, {
        default: () => {
          return `<p><em>This post has been ported from the old blog and slightly edited on the 15<sup>th</sup> of May 2022.</em></p>
<p><a href="${"/blog/pythons-most-underrated-game-engine"}">\u201CPython\u2019s most underrated game engine for beginners\u201D</a> is by far the most popular post on this blog and it seems to help a lot of people making their first steps with Python, so I decided to expand on this post by 1) refactoring the code to be both better and more pythonic and 2) solve the challenges I posted at the bottom of the first post utilizing the advantages of the new, refactored code.</p>
<p>For this tutorial, I will constantly refer back to the original code, so it might be helpful if you have a copy of it somewhere nearby.</p>
<p>The first thing we need to address is our Vec2 classes. We define two of them, one for normal vectors and one for normalized vectors. In most circumstances, this would be considered bad practice, because as you expand the functionality of your <code>Vec2</code> class, you also have to copy that functionality over to the <code>Vec2_norm</code> class, which isn\u2019t very <a target="${"_blank"}" href="${"https://en.wikipedia.org/wiki/Don't_repeat_yourself"}">DRY</a>, to say the least.</p>
<p>So let\u2019s merge these two classes into one:</p>
<pre class="${"language-py"}"><!-- HTML_TAG_START -->${`<code class="language-py"><span class="token keyword">class</span> <span class="token class-name">Vec2</span><span class="token punctuation">:</span>
    <span class="token keyword">def</span> <span class="token function">__init__</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> x<span class="token punctuation">,</span> y<span class="token punctuation">)</span><span class="token punctuation">:</span>
        self<span class="token punctuation">.</span>x <span class="token operator">=</span> x
        self<span class="token punctuation">.</span>y <span class="token operator">=</span> y
        self<span class="token punctuation">.</span>magnitude <span class="token operator">=</span> math<span class="token punctuation">.</span>sqrt<span class="token punctuation">(</span>x <span class="token operator">*</span> x <span class="token operator">+</span> y <span class="token operator">*</span> y<span class="token punctuation">)</span>

    <span class="token keyword">def</span> <span class="token function">normalized</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">return</span> Vec2<span class="token punctuation">(</span>self<span class="token punctuation">.</span>x <span class="token operator">/</span> self<span class="token punctuation">.</span>magnitude<span class="token punctuation">,</span> self<span class="token punctuation">.</span>y <span class="token operator">/</span> self<span class="token punctuation">.</span>magnitude<span class="token punctuation">)</span></code>`}<!-- HTML_TAG_END --></pre>
<p>Cool, so now we can use our <code>Vec2</code> class like we are used to and when we want to use a normalized vector we can use its <code>normalized(</code>)\` method. Easy peasy.</p>
<p>Above I mentioned something about expanding our <code>Vec2</code> classes functionality. Well, what do I mean by that? After all, we have been getting by just fine with just an <code>x</code>, a <code>y</code> and a <code>magnitude</code> attribute. Now we can even normalize a vector by calling a single method, what else could we want from our class, right?</p>
<p>Consider this: How would you add two vector objects together? Probably something like this:</p>
<pre class="${"language-py"}"><!-- HTML_TAG_START -->${`<code class="language-py">vector_1 <span class="token operator">=</span> Vec2<span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span>
vector_2 <span class="token operator">=</span> Vec2<span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span>
vector_sum <span class="token operator">=</span> Vec2<span class="token punctuation">(</span>vector_1<span class="token punctuation">.</span>x <span class="token operator">+</span> vector_2<span class="token punctuation">.</span>x<span class="token punctuation">,</span> vector_1<span class="token punctuation">.</span>y <span class="token operator">+</span> vector_2<span class="token punctuation">.</span>y<span class="token punctuation">)</span></code>`}<!-- HTML_TAG_END --></pre>
<p>That\u2019s an awful lot of code for such a simple operation though, isn\u2019t it? Shouldn\u2019t it be a simple as <code>vector_sum = vector_1 + vector2</code>? This is where Python\u2019s magic methods come into play. You see, we can achieve exactly this behavior, by specifying our vector\u2019s <code>**add**</code> method like this:</p>
<pre class="${"language-py"}"><!-- HTML_TAG_START -->${`<code class="language-py"><span class="token keyword">def</span> <span class="token function">__add__</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> other<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">return</span> Vec2<span class="token punctuation">(</span>self<span class="token punctuation">.</span>x <span class="token operator">+</span> other<span class="token punctuation">.</span>x<span class="token punctuation">,</span> self<span class="token punctuation">.</span>y <span class="token operator">+</span> other<span class="token punctuation">.</span>y<span class="token punctuation">)</span></code>`}<!-- HTML_TAG_END --></pre>
<p>Now, whenever we use the + operator with two vector objects it will perform the addition and return a new vector object with the new values.</p>
<p>Here is a little exercise: Try and define magic methods for all the other basic arithmetic operations and when you have done that I show you my solution. The methods you are looking for are called <code>**sub**</code>, <code>**mul**</code> and <code>**truediv**</code>.</p>
<hr>
<p>Have you done it? Great. Here is what I have:</p>
<pre class="${"language-py"}"><!-- HTML_TAG_START -->${`<code class="language-py"><span class="token keyword">class</span> <span class="token class-name">Vec2</span><span class="token punctuation">:</span>
    <span class="token keyword">def</span> <span class="token function">__init__</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> x<span class="token punctuation">,</span> y<span class="token punctuation">)</span><span class="token punctuation">:</span>
        self<span class="token punctuation">.</span>x <span class="token operator">=</span> x
        self<span class="token punctuation">.</span>y <span class="token operator">=</span> y
        self<span class="token punctuation">.</span>magnitude <span class="token operator">=</span> math<span class="token punctuation">.</span>sqrt<span class="token punctuation">(</span>x <span class="token operator">*</span> x <span class="token operator">+</span> y <span class="token operator">*</span> y<span class="token punctuation">)</span>

    <span class="token keyword">def</span> <span class="token function">__add__</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> other<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">if</span> <span class="token keyword">not</span> <span class="token builtin">isinstance</span><span class="token punctuation">(</span>other<span class="token punctuation">,</span> Vec2<span class="token punctuation">)</span><span class="token punctuation">:</span>
            <span class="token keyword">raise</span> TypeError<span class="token punctuation">(</span><span class="token string">"Only 2 Vec2 can be added to each other!"</span><span class="token punctuation">)</span>
        <span class="token keyword">return</span> Vec2<span class="token punctuation">(</span>self<span class="token punctuation">.</span>x <span class="token operator">+</span> other<span class="token punctuation">.</span>x<span class="token punctuation">,</span> self<span class="token punctuation">.</span>y <span class="token operator">+</span> other<span class="token punctuation">.</span>y<span class="token punctuation">)</span>

    <span class="token keyword">def</span> <span class="token function">__sub__</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> other<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">if</span> <span class="token keyword">not</span> <span class="token builtin">isinstance</span><span class="token punctuation">(</span>other<span class="token punctuation">,</span> Vec2<span class="token punctuation">)</span><span class="token punctuation">:</span>
            <span class="token keyword">raise</span> TypeError<span class="token punctuation">(</span><span class="token string">"Only a Vec2 can be subtracted from another!"</span><span class="token punctuation">)</span>
        <span class="token keyword">return</span> Vec2<span class="token punctuation">(</span>self<span class="token punctuation">.</span>x <span class="token operator">-</span> other<span class="token punctuation">.</span>x<span class="token punctuation">,</span> self<span class="token punctuation">.</span>y <span class="token operator">-</span> other<span class="token punctuation">.</span>y<span class="token punctuation">)</span>

    <span class="token keyword">def</span> <span class="token function">__mul__</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> scalar<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">if</span> <span class="token keyword">not</span> <span class="token builtin">isinstance</span><span class="token punctuation">(</span>scalar<span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token builtin">int</span><span class="token punctuation">,</span> <span class="token builtin">float</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
            <span class="token keyword">raise</span> TypeError<span class="token punctuation">(</span><span class="token string">"A Vec2 can only be mulitplied by a scalar!"</span><span class="token punctuation">)</span>
        <span class="token keyword">return</span> Vec2<span class="token punctuation">(</span>self<span class="token punctuation">.</span>x <span class="token operator">*</span> scalar<span class="token punctuation">,</span> self<span class="token punctuation">.</span>y <span class="token operator">*</span> scalar<span class="token punctuation">)</span>

    <span class="token keyword">def</span> <span class="token function">__truediv__</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> scalar<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">if</span> <span class="token keyword">not</span> <span class="token builtin">isinstance</span><span class="token punctuation">(</span>scalar<span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token builtin">int</span><span class="token punctuation">,</span> <span class="token builtin">float</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
            <span class="token keyword">raise</span> TypeError<span class="token punctuation">(</span><span class="token string">"A Vec2 can only be divided by a scalar!"</span><span class="token punctuation">)</span>
        <span class="token keyword">return</span> Vec2<span class="token punctuation">(</span>self<span class="token punctuation">.</span>x <span class="token operator">/</span> scalar<span class="token punctuation">,</span> self<span class="token punctuation">.</span>y <span class="token operator">/</span> scalar<span class="token punctuation">)</span>

    <span class="token keyword">def</span> <span class="token function">normalized</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">return</span> self <span class="token operator">/</span> self<span class="token punctuation">.</span>magnitude</code>`}<!-- HTML_TAG_END --></pre>
<p>Easy right? You are probably noticing two things in my code though: Firstly, I have included checks to make sure the operators are used with the right data type since vectors can only be added to and subtracted from other vectors, yet can only be multiplied and divided by single numbers (called scalars). Secondly, I have refactored the <code>normalized()</code> method yet again to take advantage of this new functionality right away. Looking mighty fine, let\u2019s move on.</p>
<p>Next, let\u2019s look at our <code>HitBox</code> class. The first thing we should notice is that this class actually has no functionality at all. It consists exclusively of attributes and has no methods. Whenever you encounter a class like this, it is a perfect opportunity to refactor, since a class like this can (and should) be refactored into a collection type called <code>namedtuple</code>. So after adding the <code>from collections import namedtuple</code> statement at the top of our file, let\u2019s refactor our HitBox to look like this: <code>HitBox = namedtuple(&quot;HitBox&quot;, &quot;x1 y1 x2 y2&quot;)</code>. Single line. Easy as pie. If something about this confuses you, check out <a href="${"https://docs.python.org/2/library/collections.html#collections.namedtuple"}">the official documentation here</a>.</p>
<p>The best part is that we can actually use this like our original <code>HitBox</code> class, so we can leave the parts of our code that used the class as they are, but not only that, since this is now a sequence type, we have now implicitly made any <code>HitBox</code> iterable. <em>\u201CYeah that\u2019s nice\u201D</em>, you might say, <em>\u201Cbut when do I realistically need to iterate through the coordinates of a hitbox? That\u2019s not very useful.\u201D</em></p>
<p>Well, let\u2019s take a look at the <code>draw</code> method of our original <code>App</code> class. Until now it looks like this:</p>
<pre class="${"language-py"}"><!-- HTML_TAG_START -->${`<code class="language-py"><span class="token keyword">def</span> <span class="token function">draw</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
    pyxel<span class="token punctuation">.</span>cls<span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span>
    pyxel<span class="token punctuation">.</span>circ<span class="token punctuation">(</span>self<span class="token punctuation">.</span>ball<span class="token punctuation">.</span>position<span class="token punctuation">.</span>x<span class="token punctuation">,</span> self<span class="token punctuation">.</span>ball<span class="token punctuation">.</span>position<span class="token punctuation">.</span>y<span class="token punctuation">,</span> BALL_SIZE<span class="token punctuation">,</span> <span class="token number">7</span><span class="token punctuation">)</span>
    <span class="token keyword">for</span> bat <span class="token keyword">in</span> self<span class="token punctuation">.</span>bats<span class="token punctuation">:</span>
        pyxel<span class="token punctuation">.</span>rect<span class="token punctuation">(</span>bat<span class="token punctuation">.</span>hitBox<span class="token punctuation">.</span>x1<span class="token punctuation">,</span> bat<span class="token punctuation">.</span>hitBox<span class="token punctuation">.</span>y1<span class="token punctuation">,</span> bat<span class="token punctuation">.</span>hitBox<span class="token punctuation">.</span>x2<span class="token punctuation">,</span> bat<span class="token punctuation">.</span>hitBox<span class="token punctuation">.</span>y2<span class="token punctuation">,</span> <span class="token number">7</span><span class="token punctuation">)</span>
    pyxel<span class="token punctuation">.</span>text<span class="token punctuation">(</span>SCREEN_WIDTH <span class="token operator">/</span> <span class="token number">2</span><span class="token punctuation">,</span> SCREEN_HEIGHT <span class="token operator">/</span> <span class="token number">12</span><span class="token punctuation">,</span> <span class="token builtin">str</span><span class="token punctuation">(</span>self<span class="token punctuation">.</span>score<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token number">7</span><span class="token punctuation">)</span></code>`}<!-- HTML_TAG_END --></pre>
<p>Notice how we need to reference every single coordinate when drawing a rectangle for our bats? You see, being iterable does not only mean that we can iterate through it, it also means that we can make use of Python\u2019s very powerful packing/unpacking features. Here we can refactor the relevant line to <code>pyxel.rect(\\*bat.hitBox, 7)</code>, which is way prettier and to the point.</p>
<p>For the rest of the script, the refactoring is rather unexciting, but what we definitely should do, is to move the BALL_SPEED, BALL_SIZE and BRICK_SIZE constants to where they belong: Their respective classes. You can do that yourself or copy it from below, where you find the complete script as we have it right now, just so we are on the same page:</p>
<pre class="${"language-py"}"><!-- HTML_TAG_START -->${`<code class="language-py"><span class="token keyword">from</span> collections <span class="token keyword">import</span> namedtuple
<span class="token keyword">import</span> math
<span class="token keyword">import</span> pyxel

SCREEN_WIDTH <span class="token operator">=</span> <span class="token number">255</span>
SCREEN_HEIGHT <span class="token operator">=</span> <span class="token number">120</span>

HitBox <span class="token operator">=</span> namedtuple<span class="token punctuation">(</span><span class="token string">"HitBox"</span><span class="token punctuation">,</span> <span class="token string">"x1 y1 x2 y2"</span><span class="token punctuation">)</span>


<span class="token keyword">class</span> <span class="token class-name">Vec2</span><span class="token punctuation">:</span>
    <span class="token keyword">def</span> <span class="token function">__init__</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> x<span class="token punctuation">,</span> y<span class="token punctuation">)</span><span class="token punctuation">:</span>
        self<span class="token punctuation">.</span>x <span class="token operator">=</span> x
        self<span class="token punctuation">.</span>y <span class="token operator">=</span> y
        self<span class="token punctuation">.</span>magnitude <span class="token operator">=</span> math<span class="token punctuation">.</span>sqrt<span class="token punctuation">(</span>x <span class="token operator">*</span> x <span class="token operator">+</span> y <span class="token operator">*</span> y<span class="token punctuation">)</span>

    <span class="token keyword">def</span> <span class="token function">__add__</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> other<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">if</span> <span class="token keyword">not</span> <span class="token builtin">isinstance</span><span class="token punctuation">(</span>other<span class="token punctuation">,</span> Vec2<span class="token punctuation">)</span><span class="token punctuation">:</span>
            <span class="token keyword">raise</span> TypeError<span class="token punctuation">(</span><span class="token string">"Only 2 Vec2 can be added to each other!"</span><span class="token punctuation">)</span>
        <span class="token keyword">return</span> Vec2<span class="token punctuation">(</span>self<span class="token punctuation">.</span>x <span class="token operator">+</span> other<span class="token punctuation">.</span>x<span class="token punctuation">,</span> self<span class="token punctuation">.</span>y <span class="token operator">+</span> other<span class="token punctuation">.</span>y<span class="token punctuation">)</span>

    <span class="token keyword">def</span> <span class="token function">__sub__</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> other<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">if</span> <span class="token keyword">not</span> <span class="token builtin">isinstance</span><span class="token punctuation">(</span>other<span class="token punctuation">,</span> Vec2<span class="token punctuation">)</span><span class="token punctuation">:</span>
            <span class="token keyword">raise</span> TypeError<span class="token punctuation">(</span><span class="token string">"Only a Vec2 can be subtracted from another!"</span><span class="token punctuation">)</span>
        <span class="token keyword">return</span> Vec2<span class="token punctuation">(</span>self<span class="token punctuation">.</span>x <span class="token operator">-</span> other<span class="token punctuation">.</span>x<span class="token punctuation">,</span> self<span class="token punctuation">.</span>y <span class="token operator">-</span> other<span class="token punctuation">.</span>y<span class="token punctuation">)</span>

    <span class="token keyword">def</span> <span class="token function">__mul__</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> scalar<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">if</span> <span class="token keyword">not</span> <span class="token builtin">isinstance</span><span class="token punctuation">(</span>scalar<span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token builtin">int</span><span class="token punctuation">,</span> <span class="token builtin">float</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
            <span class="token keyword">raise</span> TypeError<span class="token punctuation">(</span><span class="token string">"A Vec2 can only be mulitplied by a scalar!"</span><span class="token punctuation">)</span>
        <span class="token keyword">return</span> Vec2<span class="token punctuation">(</span>self<span class="token punctuation">.</span>x <span class="token operator">*</span> scalar<span class="token punctuation">,</span> self<span class="token punctuation">.</span>y <span class="token operator">*</span> scalar<span class="token punctuation">)</span>

    <span class="token keyword">def</span> <span class="token function">__truediv__</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> scalar<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">if</span> <span class="token keyword">not</span> <span class="token builtin">isinstance</span><span class="token punctuation">(</span>scalar<span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token builtin">int</span><span class="token punctuation">,</span> <span class="token builtin">float</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
            <span class="token keyword">raise</span> TypeError<span class="token punctuation">(</span><span class="token string">"A Vec2 can only be divided by a scalar!"</span><span class="token punctuation">)</span>
        <span class="token keyword">return</span> Vec2<span class="token punctuation">(</span>self<span class="token punctuation">.</span>x <span class="token operator">/</span> scalar<span class="token punctuation">,</span> self<span class="token punctuation">.</span>y <span class="token operator">/</span> scalar<span class="token punctuation">)</span>

    <span class="token keyword">def</span> <span class="token function">normalized</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">return</span> self <span class="token operator">/</span> self<span class="token punctuation">.</span>magnitude


<span class="token keyword">class</span> <span class="token class-name">Ball</span><span class="token punctuation">:</span>
    <span class="token keyword">def</span> <span class="token function">__init__</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> px<span class="token punctuation">,</span> py<span class="token punctuation">,</span> vx<span class="token punctuation">,</span> vy<span class="token punctuation">,</span> speed<span class="token operator">=</span><span class="token number">2</span><span class="token punctuation">,</span> size<span class="token operator">=</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
        self<span class="token punctuation">.</span>position <span class="token operator">=</span> Vec2<span class="token punctuation">(</span>px<span class="token punctuation">,</span> py<span class="token punctuation">)</span>
        self<span class="token punctuation">.</span>speed <span class="token operator">=</span> speed
        self<span class="token punctuation">.</span>size <span class="token operator">=</span> size
        self<span class="token punctuation">.</span>velocity <span class="token operator">=</span> Vec2<span class="token punctuation">(</span>vx<span class="token punctuation">,</span> vy<span class="token punctuation">)</span><span class="token punctuation">.</span>normalized<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span> self<span class="token punctuation">.</span>speed

    <span class="token keyword">def</span> <span class="token function">changeSpeedBy</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> number<span class="token punctuation">)</span><span class="token punctuation">:</span>
        self<span class="token punctuation">.</span>speed <span class="token operator">*=</span> number
        self<span class="token punctuation">.</span>velocity <span class="token operator">=</span> self<span class="token punctuation">.</span>velocity<span class="token punctuation">.</span>normalized<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span> self<span class="token punctuation">.</span>speed

    <span class="token keyword">def</span> <span class="token function">update</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        self<span class="token punctuation">.</span>position<span class="token punctuation">.</span>x <span class="token operator">+=</span> self<span class="token punctuation">.</span>velocity<span class="token punctuation">.</span>x
        self<span class="token punctuation">.</span>position<span class="token punctuation">.</span>y <span class="token operator">+=</span> self<span class="token punctuation">.</span>velocity<span class="token punctuation">.</span>y

        <span class="token keyword">if</span> self<span class="token punctuation">.</span>position<span class="token punctuation">.</span>y <span class="token operator">&amp;</span>gt<span class="token punctuation">;</span><span class="token operator">=</span> SCREEN_HEIGHT <span class="token operator">-</span> self<span class="token punctuation">.</span>size<span class="token punctuation">:</span>
            self<span class="token punctuation">.</span>velocity<span class="token punctuation">.</span>y <span class="token operator">=</span> <span class="token operator">-</span>self<span class="token punctuation">.</span>velocity<span class="token punctuation">.</span>y

        <span class="token keyword">if</span> self<span class="token punctuation">.</span>position<span class="token punctuation">.</span>y <span class="token operator">&amp;</span>lt<span class="token punctuation">;</span><span class="token operator">=</span> self<span class="token punctuation">.</span>size<span class="token punctuation">:</span>
            self<span class="token punctuation">.</span>velocity<span class="token punctuation">.</span>y <span class="token operator">=</span> <span class="token operator">-</span>self<span class="token punctuation">.</span>velocity<span class="token punctuation">.</span>y


<span class="token keyword">class</span> <span class="token class-name">Bat</span><span class="token punctuation">:</span>
    <span class="token keyword">def</span> <span class="token function">__init__</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> px<span class="token punctuation">,</span> py<span class="token punctuation">,</span> size<span class="token operator">=</span><span class="token number">8</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
        self<span class="token punctuation">.</span>position <span class="token operator">=</span> Vec2<span class="token punctuation">(</span>px<span class="token punctuation">,</span> py<span class="token punctuation">)</span>
        self<span class="token punctuation">.</span>velocity <span class="token operator">=</span> <span class="token number">0</span>
        self<span class="token punctuation">.</span>size <span class="token operator">=</span> size
        self<span class="token punctuation">.</span>hitBox <span class="token operator">=</span> HitBox<span class="token punctuation">(</span>
            self<span class="token punctuation">.</span>position<span class="token punctuation">.</span>x <span class="token operator">-</span> self<span class="token punctuation">.</span>size <span class="token operator">/</span> <span class="token number">4</span><span class="token punctuation">,</span>
            self<span class="token punctuation">.</span>position<span class="token punctuation">.</span>y <span class="token operator">-</span> self<span class="token punctuation">.</span>size<span class="token punctuation">,</span>
            self<span class="token punctuation">.</span>position<span class="token punctuation">.</span>x <span class="token operator">+</span> self<span class="token punctuation">.</span>size <span class="token operator">/</span> <span class="token number">4</span><span class="token punctuation">,</span>
            self<span class="token punctuation">.</span>position<span class="token punctuation">.</span>y <span class="token operator">+</span> self<span class="token punctuation">.</span>size<span class="token punctuation">,</span>
        <span class="token punctuation">)</span>

    <span class="token keyword">def</span> <span class="token function">update</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        self<span class="token punctuation">.</span>position<span class="token punctuation">.</span>y <span class="token operator">+=</span> self<span class="token punctuation">.</span>velocity
        self<span class="token punctuation">.</span>hitBox <span class="token operator">=</span> HitBox<span class="token punctuation">(</span>
            self<span class="token punctuation">.</span>position<span class="token punctuation">.</span>x <span class="token operator">-</span> self<span class="token punctuation">.</span>size <span class="token operator">/</span> <span class="token number">4</span><span class="token punctuation">,</span>
            self<span class="token punctuation">.</span>position<span class="token punctuation">.</span>y <span class="token operator">-</span> self<span class="token punctuation">.</span>size<span class="token punctuation">,</span>
            self<span class="token punctuation">.</span>position<span class="token punctuation">.</span>x <span class="token operator">+</span> self<span class="token punctuation">.</span>size <span class="token operator">/</span> <span class="token number">4</span><span class="token punctuation">,</span>
            self<span class="token punctuation">.</span>position<span class="token punctuation">.</span>y <span class="token operator">+</span> self<span class="token punctuation">.</span>size<span class="token punctuation">,</span>
        <span class="token punctuation">)</span>

        <span class="token keyword">if</span> pyxel<span class="token punctuation">.</span>btnp<span class="token punctuation">(</span>pyxel<span class="token punctuation">.</span>KEY_W<span class="token punctuation">)</span><span class="token punctuation">:</span>
            self<span class="token punctuation">.</span>velocity <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">2</span>

        <span class="token keyword">if</span> pyxel<span class="token punctuation">.</span>btnp<span class="token punctuation">(</span>pyxel<span class="token punctuation">.</span>KEY_S<span class="token punctuation">)</span><span class="token punctuation">:</span>
            self<span class="token punctuation">.</span>velocity <span class="token operator">=</span> <span class="token number">2</span>

        <span class="token keyword">if</span> self<span class="token punctuation">.</span>position<span class="token punctuation">.</span>y <span class="token operator">-</span> self<span class="token punctuation">.</span>size <span class="token operator">&amp;</span>lt<span class="token punctuation">;</span> <span class="token number">0</span><span class="token punctuation">:</span>
            self<span class="token punctuation">.</span>position<span class="token punctuation">.</span>y <span class="token operator">=</span> self<span class="token punctuation">.</span>size
            self<span class="token punctuation">.</span>velocity <span class="token operator">=</span> <span class="token number">0</span>

        <span class="token keyword">if</span> self<span class="token punctuation">.</span>position<span class="token punctuation">.</span>y <span class="token operator">+</span> self<span class="token punctuation">.</span>size <span class="token operator">&amp;</span>gt<span class="token punctuation">;</span> SCREEN_HEIGHT<span class="token punctuation">:</span>
            self<span class="token punctuation">.</span>position<span class="token punctuation">.</span>y <span class="token operator">=</span> SCREEN_HEIGHT <span class="token operator">-</span> self<span class="token punctuation">.</span>size
            self<span class="token punctuation">.</span>velocity <span class="token operator">=</span> <span class="token number">0</span>


<span class="token keyword">class</span> <span class="token class-name">App</span><span class="token punctuation">:</span>
    <span class="token keyword">def</span> <span class="token function">__init__</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        pyxel<span class="token punctuation">.</span>init<span class="token punctuation">(</span>SCREEN_WIDTH<span class="token punctuation">,</span> SCREEN_HEIGHT<span class="token punctuation">)</span>
        self<span class="token punctuation">.</span>ball <span class="token operator">=</span> Ball<span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">,</span> <span class="token number">20</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span>
        self<span class="token punctuation">.</span>score <span class="token operator">=</span> <span class="token number">0</span>
        pyxel<span class="token punctuation">.</span>run<span class="token punctuation">(</span>self<span class="token punctuation">.</span>update<span class="token punctuation">,</span> self<span class="token punctuation">.</span>draw<span class="token punctuation">)</span>

    <span class="token keyword">def</span> <span class="token function">update</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">if</span> pyxel<span class="token punctuation">.</span>btnp<span class="token punctuation">(</span>pyxel<span class="token punctuation">.</span>KEY_Q<span class="token punctuation">)</span><span class="token punctuation">:</span>
            pyxel<span class="token punctuation">.</span>quit<span class="token punctuation">(</span><span class="token punctuation">)</span>
        self<span class="token punctuation">.</span>ball<span class="token punctuation">.</span>update<span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token keyword">if</span> self<span class="token punctuation">.</span>ball<span class="token punctuation">.</span>position<span class="token punctuation">.</span>x <span class="token operator">&amp;</span>gt<span class="token punctuation">;</span><span class="token operator">=</span> SCREEN_WIDTH <span class="token operator">-</span> self<span class="token punctuation">.</span>size<span class="token punctuation">:</span>
            pyxel<span class="token punctuation">.</span>quit<span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token keyword">if</span> self<span class="token punctuation">.</span>ball<span class="token punctuation">.</span>position<span class="token punctuation">.</span>x <span class="token operator">&amp;</span>lt<span class="token punctuation">;</span><span class="token operator">=</span> self<span class="token punctuation">.</span>size<span class="token punctuation">:</span>
            pyxel<span class="token punctuation">.</span>quit<span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token keyword">def</span> <span class="token function">draw</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        pyxel<span class="token punctuation">.</span>cls<span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span>
        pyxel<span class="token punctuation">.</span>circ<span class="token punctuation">(</span>self<span class="token punctuation">.</span>ball<span class="token punctuation">.</span>position<span class="token punctuation">.</span>x<span class="token punctuation">,</span> self<span class="token punctuation">.</span>ball<span class="token punctuation">.</span>position<span class="token punctuation">.</span>y<span class="token punctuation">,</span> self<span class="token punctuation">.</span>size<span class="token punctuation">,</span> <span class="token number">7</span><span class="token punctuation">)</span>
        pyxel<span class="token punctuation">.</span>text<span class="token punctuation">(</span>SCREEN_WIDTH <span class="token operator">/</span> <span class="token number">2</span><span class="token punctuation">,</span> SCREEN_HEIGHT <span class="token operator">/</span> <span class="token number">12</span><span class="token punctuation">,</span> <span class="token builtin">str</span><span class="token punctuation">(</span>self<span class="token punctuation">.</span>score<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token number">7</span><span class="token punctuation">)</span>


<span class="token keyword">class</span> <span class="token class-name">App</span><span class="token punctuation">:</span>
    <span class="token keyword">def</span> <span class="token function">__init__</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        pyxel<span class="token punctuation">.</span>init<span class="token punctuation">(</span>SCREEN_WIDTH<span class="token punctuation">,</span> SCREEN_HEIGHT<span class="token punctuation">)</span>
        self<span class="token punctuation">.</span>ball <span class="token operator">=</span> Ball<span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">,</span> <span class="token number">20</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span>
        self<span class="token punctuation">.</span>bats <span class="token operator">=</span> <span class="token punctuation">[</span>Bat<span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">,</span> Bat<span class="token punctuation">(</span>SCREEN_WIDTH <span class="token operator">-</span> <span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">]</span>
        self<span class="token punctuation">.</span>score <span class="token operator">=</span> <span class="token number">0</span>
        pyxel<span class="token punctuation">.</span>run<span class="token punctuation">(</span>self<span class="token punctuation">.</span>update<span class="token punctuation">,</span> self<span class="token punctuation">.</span>draw<span class="token punctuation">)</span>

    <span class="token keyword">def</span> <span class="token function">update</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">if</span> pyxel<span class="token punctuation">.</span>btnp<span class="token punctuation">(</span>pyxel<span class="token punctuation">.</span>KEY_Q<span class="token punctuation">)</span><span class="token punctuation">:</span>
            pyxel<span class="token punctuation">.</span>quit<span class="token punctuation">(</span><span class="token punctuation">)</span>
        self<span class="token punctuation">.</span>ball<span class="token punctuation">.</span>update<span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token keyword">for</span> bat <span class="token keyword">in</span> self<span class="token punctuation">.</span>bats<span class="token punctuation">:</span>
            bat<span class="token punctuation">.</span>update<span class="token punctuation">(</span><span class="token punctuation">)</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>
                bat<span class="token punctuation">.</span>hitBox<span class="token punctuation">.</span>x1 <span class="token operator">&amp;</span>lt<span class="token punctuation">;</span> self<span class="token punctuation">.</span>ball<span class="token punctuation">.</span>position<span class="token punctuation">.</span>x <span class="token operator">&amp;</span>lt<span class="token punctuation">;</span> bat<span class="token punctuation">.</span>hitBox<span class="token punctuation">.</span>x2
                <span class="token keyword">and</span> bat<span class="token punctuation">.</span>hitBox<span class="token punctuation">.</span>y1 <span class="token operator">&amp;</span>lt<span class="token punctuation">;</span> self<span class="token punctuation">.</span>ball<span class="token punctuation">.</span>position<span class="token punctuation">.</span>y <span class="token operator">&amp;</span>lt<span class="token punctuation">;</span> bat<span class="token punctuation">.</span>hitBox<span class="token punctuation">.</span>y2
            <span class="token punctuation">)</span><span class="token punctuation">:</span>
                self<span class="token punctuation">.</span>ball<span class="token punctuation">.</span>velocity<span class="token punctuation">.</span>x <span class="token operator">=</span> <span class="token operator">-</span>self<span class="token punctuation">.</span>ball<span class="token punctuation">.</span>velocity<span class="token punctuation">.</span>x
                self<span class="token punctuation">.</span>score <span class="token operator">+=</span> <span class="token number">1</span>
        <span class="token keyword">if</span> self<span class="token punctuation">.</span>ball<span class="token punctuation">.</span>position<span class="token punctuation">.</span>x <span class="token operator">&amp;</span>gt<span class="token punctuation">;</span><span class="token operator">=</span> SCREEN_WIDTH <span class="token operator">-</span> self<span class="token punctuation">.</span>ball<span class="token punctuation">.</span>size<span class="token punctuation">:</span>
            pyxel<span class="token punctuation">.</span>quit<span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token keyword">if</span> self<span class="token punctuation">.</span>ball<span class="token punctuation">.</span>position<span class="token punctuation">.</span>x <span class="token operator">&amp;</span>lt<span class="token punctuation">;</span><span class="token operator">=</span> self<span class="token punctuation">.</span>ball<span class="token punctuation">.</span>size<span class="token punctuation">:</span>
            pyxel<span class="token punctuation">.</span>quit<span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token keyword">def</span> <span class="token function">draw</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        pyxel<span class="token punctuation">.</span>cls<span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span>
        pyxel<span class="token punctuation">.</span>circ<span class="token punctuation">(</span>self<span class="token punctuation">.</span>ball<span class="token punctuation">.</span>position<span class="token punctuation">.</span>x<span class="token punctuation">,</span> self<span class="token punctuation">.</span>ball<span class="token punctuation">.</span>position<span class="token punctuation">.</span>y<span class="token punctuation">,</span> self<span class="token punctuation">.</span>ball<span class="token punctuation">.</span>size<span class="token punctuation">,</span> <span class="token number">7</span><span class="token punctuation">)</span>
        <span class="token keyword">for</span> bat <span class="token keyword">in</span> self<span class="token punctuation">.</span>bats<span class="token punctuation">:</span>
            pyxel<span class="token punctuation">.</span>rect<span class="token punctuation">(</span><span class="token operator">*</span>bat<span class="token punctuation">.</span>hitBox<span class="token punctuation">,</span> <span class="token number">7</span><span class="token punctuation">)</span>
        pyxel<span class="token punctuation">.</span>text<span class="token punctuation">(</span>SCREEN_WIDTH <span class="token operator">/</span> <span class="token number">2</span><span class="token punctuation">,</span> SCREEN_HEIGHT <span class="token operator">/</span> <span class="token number">12</span><span class="token punctuation">,</span> <span class="token builtin">str</span><span class="token punctuation">(</span>self<span class="token punctuation">.</span>score<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token number">7</span><span class="token punctuation">)</span>


App<span class="token punctuation">(</span><span class="token punctuation">)</span></code>`}<!-- HTML_TAG_END --></pre>
<p>Now that we have a much better version of the original code, let\u2019s try and implement the improvements I was suggesting at the end of the first post, these were:</p>
<ul><li>To make the game less predictable, let\u2019s change the ball\u2019s angle by which he bounces back from the bat by a small random value. Hint: you will probably want to \`from random import uniform for this one.<ul><li>More advanced: Make the angle change based on the position of the ball relative to the position of the bat at the time of contact.</li></ul></li>
<li>Make the game harder as it goes along, maybe increase the ball speed a little every 5 points (it isn\u2019t technically necessary, but it would be good practice to rename the <code>BALL_SPEED</code> variable to <code>ball_speed</code>, since all-cap variable names generally indicate constants).</li>
<li>Use different color schemes. Maybe even change colors dynamically throughout the game (to indicate an increase in ball speed for example).</li>
<li>There is a bug, that when the ball enters the bat from the bottom or top rather than the side, it will get kind of stuck there, maybe you can figure out what the problem is and fix it?</li></ul>
<h2>Change the balls angle based on the position of the ball relative to the position of the bat at the time of contact</h2>
<p>Let\u2019s just go for the more advanced version right away. First, let\u2019s clarify what we mean by \u201Cangle\u201D and what we mean by \u201Crelative to\u201D in terms of our code. When we say \u201Cangle, we mean that not only the x-attribute of our balls velocity vector changes but also the y-attribute. When we say \u201Crelative to\u201D we mean to compare the ball\u2019s y-position with the bat\u2019s y-position.</p>
<p>Let\u2019s start looking at our code. We check for the collision between ball and bat starting on line 113 inside our <code>App</code>\u2019s <code>update</code> method. Instead of just reversing the direction of the ball on the x-axis like we are doing right now, let\u2019s also play with the y-value of the velocity vector.</p>
<p>The problem here is that this can become messy since we have lots of cases we want to avoid. We don\u2019t want to make it so big for example, that the ball is just moving in a straight vertical line, we also don\u2019t want it to lock in to just go perfectly horizontal near the edge of the screen forever (which could potentially happen). Put aptly, we want to keep control over the range of acceptable y-values. In other words: We want to keep the ball from getting crazy.</p>
<p>Here is how I would go about this. Knowing that this can get messy, I will not attempt to edit the code right then and there, but rather define its own function for this behavior.</p>
<p>The idea is this: We take in a value I\u2019m calling offset, which is what determines how much the value should be changed. Then I\u2019m also defining a range of inputs (minimum and maximum value of the offset) and a range of outputs (this is how I keep control over what I want to allow). Then I am mapping my range of inputs to the range of outputs and translate my offset to fit the mapping. Phu, that was a lot, let\u2019s see it in action:</p>
<pre class="${"language-py"}"><!-- HTML_TAG_START -->${`<code class="language-py"><span class="token keyword">def</span> <span class="token function">mutate_y_value</span><span class="token punctuation">(</span>offset<span class="token punctuation">,</span> min_input<span class="token punctuation">,</span> max_input<span class="token punctuation">,</span> min_output<span class="token punctuation">,</span> max_output<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token comment"># determining the size of each range</span>
    offset_range <span class="token operator">=</span> max_offset <span class="token operator">-</span> min_offset
    output_range <span class="token operator">=</span> max_output <span class="token operator">-</span> min_output

    <span class="token comment"># converting the offset_range to a range 0-1</span>

offset_scaled <span class="token operator">=</span> <span class="token builtin">float</span><span class="token punctuation">(</span>offset <span class="token operator">-</span> min_offset<span class="token punctuation">)</span> <span class="token operator">/</span> <span class="token builtin">float</span><span class="token punctuation">(</span>offset_range<span class="token punctuation">)</span>

    <span class="token comment"># returning the mapped value</span>
    <span class="token keyword">return</span> min_output <span class="token operator">+</span> <span class="token punctuation">(</span>offset_scaled <span class="token operator">*</span> output_range<span class="token punctuation">)</span></code>`}<!-- HTML_TAG_END --></pre>
<p>This would work, but writing a function like this could be considered bad practice. Functionality like this should be encapsulated by the entity it belongs to. I would argue this functionality belongs to our <code>Vec2</code> class. Rewritten as a method of the <code>Vec2</code> class, it now looks like this:</p>
<pre class="${"language-py"}"><!-- HTML_TAG_START -->${`<code class="language-py"><span class="token keyword">def</span> <span class="token function">mutate_y_value_in_range</span><span class="token punctuation">(</span>
    self<span class="token punctuation">,</span> offset<span class="token punctuation">,</span> min_offset<span class="token punctuation">,</span> max_offset<span class="token punctuation">,</span> min_output<span class="token punctuation">,</span> max_output
<span class="token punctuation">)</span><span class="token punctuation">:</span>
    offset_range <span class="token operator">=</span> max_offset <span class="token operator">-</span> min_offset
    output_range <span class="token operator">=</span> max_output <span class="token operator">-</span> min_output

    offset_scaled <span class="token operator">=</span> <span class="token builtin">float</span><span class="token punctuation">(</span>offset <span class="token operator">-</span> min_offset<span class="token punctuation">)</span> <span class="token operator">/</span> <span class="token builtin">float</span><span class="token punctuation">(</span>offset_range<span class="token punctuation">)</span>

    <span class="token keyword">return</span> Vec2<span class="token punctuation">(</span>self<span class="token punctuation">.</span>x<span class="token punctuation">,</span> self<span class="token punctuation">.</span>y <span class="token operator">+</span> min_output <span class="token operator">+</span> <span class="token punctuation">(</span>offset_scaled <span class="token operator">*</span> output_range<span class="token punctuation">)</span><span class="token punctuation">)</span></code>`}<!-- HTML_TAG_END --></pre>
<p>Notice how I have added the <code>self</code> argument and how I am utilizing it to return a new vector object, to make its application easier.</p>
<p>So how do we apply this function? In our App\u2019s update method, between reversing the ball\u2019s velocity\u2019s x-value, and incrementing the score, we call our new method:</p>
<pre class="${"language-py"}"><!-- HTML_TAG_START -->${`<code class="language-py">self<span class="token punctuation">.</span>ball<span class="token punctuation">.</span>velocity <span class="token operator">=</span> <span class="token punctuation">(</span>
    self<span class="token punctuation">.</span>ball<span class="token punctuation">.</span>velocity<span class="token punctuation">.</span>mutate_y_value_in_range<span class="token punctuation">(</span>
        <span class="token punctuation">(</span>self<span class="token punctuation">.</span>ball<span class="token punctuation">.</span>position<span class="token punctuation">.</span>y <span class="token operator">-</span> bat<span class="token punctuation">.</span>position<span class="token punctuation">.</span>y<span class="token punctuation">)</span><span class="token punctuation">,</span>
        <span class="token operator">-</span>bat<span class="token punctuation">.</span>size<span class="token punctuation">,</span>
        bat<span class="token punctuation">.</span>size<span class="token punctuation">,</span>
        <span class="token operator">-</span><span class="token number">1.5</span><span class="token punctuation">,</span>
        <span class="token number">1.5</span><span class="token punctuation">,</span>
     <span class="token punctuation">)</span><span class="token punctuation">.</span>normalized<span class="token punctuation">(</span><span class="token punctuation">)</span>
     <span class="token operator">*</span> self<span class="token punctuation">.</span>ball<span class="token punctuation">.</span>speed
<span class="token punctuation">)</span></code>`}<!-- HTML_TAG_END --></pre>
<p>Here we assign a new vector to <code>self.ball.velocity</code>. Keep in mind the x-value has already been reversed. The first argument here is the difference between the ball\u2019s y-position and the bat\u2019s y-position. The <code>min_offset</code> and <code>max_offset</code> arguments cannot possibly be bigger than the size of the bats (because in that case, they would not touch the bat). The output I determined by just playing around a little. The bigger the range the sharper the angle. Whatever feels right. I went for 1.5. Time to give it a test run, maybe take a break, and move on.</p>
<h2>Increase the ball speed a little every 5 points</h2>
<p>If you powered through until this point you are beyond the level where I need to explain this one, so I\u2019m just pasting the code here.</p>
<pre class="${"language-py"}"><!-- HTML_TAG_START -->${`<code class="language-py">self<span class="token punctuation">.</span>score <span class="token operator">+=</span> <span class="token number">1</span>                 <span class="token comment"># this line already exists</span>
<span class="token keyword">if</span> self<span class="token punctuation">.</span>score <span class="token operator">%</span> <span class="token number">5</span> <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">:</span>
    self<span class="token punctuation">.</span>ball<span class="token punctuation">.</span>speed <span class="token operator">+=</span> <span class="token number">1</span>
    self<span class="token punctuation">.</span>ball<span class="token punctuation">.</span>velocity <span class="token operator">=</span> <span class="token punctuation">(</span>
        self<span class="token punctuation">.</span>ball<span class="token punctuation">.</span>velocity<span class="token punctuation">.</span>normalized<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span> self<span class="token punctuation">.</span>ball<span class="token punctuation">.</span>speed
    <span class="token punctuation">)</span></code>`}<!-- HTML_TAG_END --></pre>
<h2>Use different color schemes. Maybe even change colors dynamically throughout the game</h2>
<p>Let\u2019s use the same <code>if</code> statement for this one, but before we do that we have to substitute all the colors we are using right now with variables we can change dynamically. Right now, we are using two different colors, a foreground color for the ball the bats and the text and a background color to fill out the window. So let\u2019s define it this way: At the top of the file, create a dictionary to hold that information with something like <code>colors = dict(foreground=7, background=0)</code>. Luckily, we only use colors in our <code>App</code>\u2019s <code>draw</code> method, so we don\u2019t have to search the whole file to replace colors. After replacing these values the <code>draw</code> method should look like this:</p>
<pre class="${"language-py"}"><!-- HTML_TAG_START -->${`<code class="language-py"><span class="token keyword">def</span> <span class="token function">draw</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
    pyxel<span class="token punctuation">.</span>cls<span class="token punctuation">(</span>colors<span class="token punctuation">[</span><span class="token string">"background"</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
    pyxel<span class="token punctuation">.</span>circ<span class="token punctuation">(</span>
        self<span class="token punctuation">.</span>ball<span class="token punctuation">.</span>position<span class="token punctuation">.</span>x<span class="token punctuation">,</span>
        self<span class="token punctuation">.</span>ball<span class="token punctuation">.</span>position<span class="token punctuation">.</span>y<span class="token punctuation">,</span>
        self<span class="token punctuation">.</span>ball<span class="token punctuation">.</span>size<span class="token punctuation">,</span>
        colors<span class="token punctuation">[</span><span class="token string">"foreground"</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token punctuation">)</span>
    <span class="token keyword">for</span> bat <span class="token keyword">in</span> self<span class="token punctuation">.</span>bats<span class="token punctuation">:</span>
        pyxel<span class="token punctuation">.</span>rect<span class="token punctuation">(</span><span class="token operator">*</span>bat<span class="token punctuation">.</span>hitBox<span class="token punctuation">,</span> colors<span class="token punctuation">[</span><span class="token string">"foreground"</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
    pyxel<span class="token punctuation">.</span>text<span class="token punctuation">(</span>
        SCREEN_WIDTH <span class="token operator">/</span> <span class="token number">2</span><span class="token punctuation">,</span> SCREEN_HEIGHT <span class="token operator">/</span> <span class="token number">12</span><span class="token punctuation">,</span> <span class="token builtin">str</span><span class="token punctuation">(</span>self<span class="token punctuation">.</span>score<span class="token punctuation">)</span><span class="token punctuation">,</span> colors<span class="token punctuation">[</span><span class="token string">"foreground"</span><span class="token punctuation">]</span>
    <span class="token punctuation">)</span></code>`}<!-- HTML_TAG_END --></pre>`;
        }
      })}`;
    });
  }
});

// .svelte-kit/output/server/entries/pages/blog/tailwind-with-webassembly-yew.md.js
var import_clsx6, metadata5, Tailwind_with_webassembly_yew;
var init_tailwind_with_webassembly_yew_md = __esm({
  ".svelte-kit/output/server/entries/pages/blog/tailwind-with-webassembly-yew.md.js"() {
    init_index_87d5ee21();
    init_BlogPostLayout_4a47a672();
    init_Article_700172e8();
    init_PageHeading_da33bb91();
    import_clsx6 = __toESM(require_clsx(), 1);
    metadata5 = {
      "title": "Yew can use Tailwind anywhere!",
      "alternateTitle": "How to set up Tailwind in Yew",
      "subtitle": "even where there is no JavaScript",
      "alternateSubtitle": "hot-reloading included",
      "author": "Konstantin <mail@vomkonstant.in>",
      "published": "2022-05-20",
      "illustration": '<svg viewBox="0 0 250 250" fill="none" xmlns="http://www.w3.org/2000/svg"> <g transform="matrix(1.0416666666666667,0,0,1.0416666666666667,0,0)"><g id="Sketch-annotation-element-stroke-illustration-line-christmas-tree"> <path id="Vector" d="M109.792 217.109C109.765 204.323 110.467 191.578 110.325 178.8C95.681 180.458 64.1214 177.551 50.046 172.88C64.2747 156.903 81.393 143.904 93.3775 125.433C84.9496 125.157 76.8666 124.695 68.4687 123.744C82.5489 113.059 95.5235 99.3278 106.184 84.294C99.3939 83.8783 92.4928 84.4198 85.6814 84.2545C90.0047 78.3398 95.7493 73.6413 99.7443 67.475C109.028 53.1462 116.275 38.5515 123.15 22.6654C126.102 31.8228 130.862 39.6342 135.307 47.8405C141.169 58.6642 147.894 72.5774 157.736 79.6588C151.974 79.9709 146.271 80.8027 140.499 80.9746C146.46 95.5867 159.76 107.962 172.317 114.977C164.49 118.685 156.882 120.481 148.571 121.838C150.729 126.998 154.624 130.935 157.832 135.192C167.034 147.399 177.508 157.355 189.744 165.217C179.65 173.733 146.79 179.502 134.242 178.65C133.865 191.174 135.567 203.566 135.901 216.059" stroke="currentColor" stroke-width="5" stroke-miterlimit="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></g></svg>'
    };
    Tailwind_with_webassembly_yew = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      return `${validate_component(BlogPostLayout, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata5), {}, {
        default: () => {
          return `<p><em>If you are just looking for a template and don\u2019t care about the jibber-jabber: <a href="${"https://github.com/Neugierdsnase/yew-wasm-pack-template"}" rel="${"nofollow"}">Here you go. See ya!</a></em></p>
<p>One of the reasons Tailwind is great is that it is completely JavaScript-agnostic. As soon as you have DOM elements - however they were created or are being updated - Tailwind just works. This means it can be used with Angular, React, Svelte as much as with Solid, Inferno or whatever other ten-minute old JavaScript frameworks you can think of. But why stop there? If it is true what I just wrote, then not even JavaScript should be the limiting factor here (as it is - quite obviously - for
CSS-in-JS solutions).</p>
<p>This is precisely why I argue it is a great choice for WebAssembly projects. Let\u2019s look at an example. Fear not, you don\u2019t have to fully understand what\u2019s going on here. Just know that Yew is a front-end framework for WebAssembly in Rust, that you can probably compare best with pre-v16 React (no hooks, but lifetime methods).</p>
<pre class="${"language-rust"}"><!-- HTML_TAG_START -->${`<code class="language-rust"><span class="token comment">// ...</span>

<span class="token keyword">pub</span> <span class="token keyword">struct</span> <span class="token type-definition class-name">State</span> <span class="token punctuation">&#123;</span>
    entries<span class="token punctuation">:</span> <span class="token class-name">Vec</span><span class="token operator">&lt;</span><span class="token class-name">String</span><span class="token operator">></span><span class="token punctuation">,</span>
<span class="token punctuation">&#125;</span>

<span class="token keyword">impl</span> <span class="token class-name">Component</span> <span class="token keyword">for</span> <span class="token class-name">App</span> <span class="token punctuation">&#123;</span>
    <span class="token keyword">type</span> <span class="token type-definition class-name">Message</span> <span class="token operator">=</span> <span class="token class-name">Msg</span><span class="token punctuation">;</span>
    <span class="token keyword">type</span> <span class="token type-definition class-name">Properties</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// ...</span>

    <span class="token keyword">fn</span> <span class="token function-definition function">view</span><span class="token punctuation">(</span><span class="token operator">&amp;</span><span class="token keyword">self</span><span class="token punctuation">)</span> <span class="token punctuation">-></span> <span class="token class-name">Html</span> <span class="token punctuation">&#123;</span>
        <span class="token macro property">html!</span> <span class="token punctuation">&#123;</span>
            <span class="token operator">&lt;</span>div<span class="token operator">></span>
                <span class="token operator">&lt;</span>section<span class="token operator">></span>
                    <span class="token operator">&lt;</span>header<span class="token operator">></span>
                        <span class="token operator">&lt;</span>h1<span class="token operator">></span><span class="token punctuation">&#123;</span> <span class="token string">"todos"</span> <span class="token punctuation">&#125;</span><span class="token operator">&lt;</span><span class="token operator">/</span>h1<span class="token operator">></span>
                    <span class="token operator">&lt;</span><span class="token operator">/</span>header<span class="token operator">></span>
                    <span class="token operator">&lt;</span>section<span class="token operator">></span>
                        <span class="token operator">&lt;</span>ul<span class="token operator">></span>
                            <span class="token punctuation">&#123;</span> <span class="token keyword">for</span> <span class="token keyword">self</span><span class="token punctuation">.</span>state<span class="token punctuation">.</span>entries<span class="token punctuation">.</span><span class="token function">iter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token closure-params"><span class="token closure-punctuation punctuation">|</span>val<span class="token closure-punctuation punctuation">|</span></span> <span class="token keyword">self</span><span class="token punctuation">.</span><span class="token function">view_entry</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">&#125;</span>
                        <span class="token operator">&lt;</span><span class="token operator">/</span>ul<span class="token operator">></span>
                    <span class="token operator">&lt;</span><span class="token operator">/</span>section<span class="token operator">></span>
                <span class="token operator">&lt;</span><span class="token operator">/</span>section<span class="token operator">></span>
            <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>
        <span class="token punctuation">&#125;</span>
    <span class="token punctuation">&#125;</span>
<span class="token punctuation">&#125;</span>

<span class="token keyword">impl</span> <span class="token class-name">App</span> <span class="token punctuation">&#123;</span>
    <span class="token keyword">fn</span> <span class="token function-definition function">view_entry</span><span class="token punctuation">(</span><span class="token operator">&amp;</span><span class="token keyword">self</span><span class="token punctuation">,</span> <span class="token punctuation">(</span>idx<span class="token punctuation">,</span> entry<span class="token punctuation">)</span><span class="token punctuation">:</span> <span class="token punctuation">(</span><span class="token keyword">usize</span><span class="token punctuation">,</span> <span class="token operator">&amp;</span><span class="token keyword">str</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">-></span> <span class="token class-name">Html</span> <span class="token punctuation">&#123;</span>
      <span class="token macro property">html!</span> <span class="token punctuation">&#123;</span>
          <span class="token operator">&lt;</span>li<span class="token operator">></span>
              <span class="token operator">&lt;</span>p<span class="token operator">></span><span class="token punctuation">&#123;</span>entry<span class="token punctuation">&#125;</span><span class="token operator">&lt;</span><span class="token operator">/</span>p<span class="token operator">></span>
          <span class="token operator">&lt;</span><span class="token operator">/</span>li<span class="token operator">></span>
      <span class="token punctuation">&#125;</span>
  <span class="token punctuation">&#125;</span>
<span class="token punctuation">&#125;</span></code>`}<!-- HTML_TAG_END --></pre>
<p>This is a (not quite complete) component written in Rust using the Yew framework. Speaking fuzzily about what\u2019s happening here: The <code>view</code> method uses the <code>html</code> macro to render HTML to the screen. You can also see an implementation block, that defines what an entry looks like, which is utilized by the iterator in the <code>ul</code> element.</p>
<p>So instead of JavaScript, we are writing our code in a multi-threaded systems-level language (thinking about the performance gains this promises should give you the shivers). This is possible because of the recently standardized WASM compile target, <a target="${"_blank"}" href="${"https://webassembly.org/roadmap/"}">which all major browsers have now implemented.</a></p>
<p>As their respective ecosystems matured, Rust and WebAssembly developed a special kind of relationship. Rust has now become somewhat of the first choice for intellectually curious web developers if I can trust the information in my bubble.</p>
<p>Let\u2019s imagine for a second, that we would have to reinvent things like styled-components and styled-system for Yew and all the other frameworks, languages and frameworks in languages, that can compile to WASM. The horror! Thankfully - <a href="${"https://blog.vomkonstant.in/blog/comparing-tailwind-with-plain-css-is-wrong"}" rel="${"nofollow"}">as I have outlined here</a> - Tailwind offers much (if not more) of the same functionality at practically no performance overhead.</p>
<h2>Rust is complicated enough, let\u2019s not also add CSS files</h2>
<p>The question in my mind is: Can we set up Tailwind so that we can style our Yew components like this?</p>
<pre class="${"language-rust"}"><!-- HTML_TAG_START -->${`<code class="language-rust"><span class="token comment">// ...</span>

<span class="token keyword">pub</span> <span class="token keyword">struct</span> <span class="token type-definition class-name">State</span> <span class="token punctuation">&#123;</span>
    entries<span class="token punctuation">:</span> <span class="token class-name">Vec</span><span class="token operator">&lt;</span><span class="token class-name">String</span><span class="token operator">></span><span class="token punctuation">,</span>
<span class="token punctuation">&#125;</span>

<span class="token keyword">impl</span> <span class="token class-name">Component</span> <span class="token keyword">for</span> <span class="token class-name">App</span> <span class="token punctuation">&#123;</span>
    <span class="token keyword">type</span> <span class="token type-definition class-name">Message</span> <span class="token operator">=</span> <span class="token class-name">Msg</span><span class="token punctuation">;</span>
    <span class="token keyword">type</span> <span class="token type-definition class-name">Properties</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// ...</span>

    <span class="token keyword">fn</span> <span class="token function-definition function">view</span><span class="token punctuation">(</span><span class="token operator">&amp;</span><span class="token keyword">self</span><span class="token punctuation">)</span> <span class="token punctuation">-></span> <span class="token class-name">Html</span> <span class="token punctuation">&#123;</span>
        <span class="token macro property">html!</span> <span class="token punctuation">&#123;</span>
            <span class="token operator">&lt;</span>div class<span class="token operator">=</span><span class="token string">"w-2/3 mx-auto"</span><span class="token operator">></span>
                <span class="token operator">&lt;</span>section<span class="token operator">></span>
                    <span class="token operator">&lt;</span>header class<span class="token operator">=</span><span class="token string">"text-center my-4"</span><span class="token operator">></span>
                        <span class="token operator">&lt;</span>h1 class<span class="token operator">=</span><span class="token string">"text-6xl text-red-600"</span><span class="token operator">></span><span class="token punctuation">&#123;</span> <span class="token string">"todos"</span> <span class="token punctuation">&#125;</span><span class="token operator">&lt;</span><span class="token operator">/</span>h1<span class="token operator">></span>
                    <span class="token operator">&lt;</span><span class="token operator">/</span>header<span class="token operator">></span>
                    <span class="token operator">&lt;</span>section class<span class="token operator">=</span><span class="token string">"my-4"</span><span class="token operator">></span>
                        <span class="token operator">&lt;</span>ul<span class="token operator">></span>
                            <span class="token punctuation">&#123;</span> <span class="token keyword">for</span> <span class="token keyword">self</span><span class="token punctuation">.</span>state<span class="token punctuation">.</span>entries<span class="token punctuation">.</span><span class="token function">iter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token closure-params"><span class="token closure-punctuation punctuation">|</span>val<span class="token closure-punctuation punctuation">|</span></span> <span class="token keyword">self</span><span class="token punctuation">.</span><span class="token function">view_entry</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">&#125;</span>
                        <span class="token operator">&lt;</span><span class="token operator">/</span>ul<span class="token operator">></span>
                    <span class="token operator">&lt;</span><span class="token operator">/</span>section<span class="token operator">></span>
                <span class="token operator">&lt;</span><span class="token operator">/</span>section<span class="token operator">></span>
            <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>
        <span class="token punctuation">&#125;</span>
    <span class="token punctuation">&#125;</span>
<span class="token punctuation">&#125;</span>

<span class="token keyword">impl</span> <span class="token class-name">App</span> <span class="token punctuation">&#123;</span>
    <span class="token keyword">fn</span> <span class="token function-definition function">view_entry</span><span class="token punctuation">(</span><span class="token operator">&amp;</span><span class="token keyword">self</span><span class="token punctuation">,</span> <span class="token punctuation">(</span>idx<span class="token punctuation">,</span> entry<span class="token punctuation">)</span><span class="token punctuation">:</span> <span class="token punctuation">(</span><span class="token keyword">usize</span><span class="token punctuation">,</span> <span class="token operator">&amp;</span><span class="token keyword">str</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">-></span> <span class="token class-name">Html</span> <span class="token punctuation">&#123;</span>
      <span class="token macro property">html!</span> <span class="token punctuation">&#123;</span>
          <span class="token operator">&lt;</span>li class<span class="token operator">=</span><span class="token string">"p-4 pr-0 my-2 border-b-2 border-slate-200 last:border-0"</span><span class="token operator">></span>
              <span class="token operator">&lt;</span>p<span class="token operator">></span><span class="token punctuation">&#123;</span>entry<span class="token punctuation">&#125;</span><span class="token operator">&lt;</span><span class="token operator">/</span>p<span class="token operator">></span>
          <span class="token operator">&lt;</span><span class="token operator">/</span>li<span class="token operator">></span>
      <span class="token punctuation">&#125;</span>
  <span class="token punctuation">&#125;</span>
<span class="token punctuation">&#125;</span></code>`}<!-- HTML_TAG_END --></pre>
<p>The short answer is: <strong>\u201CYes!\u201D</strong> The slightly longer answer is: \u201CUhm, sure, but how do I set up my project for this? Will hot-reloading work?\u201D Let\u2019s find out. Spoiler alert: Everything will work just fine in the end.</p>
<p>As is so often the case in technology, we can just copy the hard parts from the smart kids and some of them have created <a target="${"_blank"}" href="${"https://github.com/yewstack/yew-wasm-pack-template"}">this project template</a>, which sets up Yew with <a target="${"_blank"}" href="${"https://rustwasm.github.io/wasm-pack/installer/"}">wasm-pack</a>, which itself relies on <a target="${"_blank"}" href="${"https://webpack.js.org/"}">webpack</a> to bundle WebAssembly code with the necessary JavaScript and CSS to make everything flow together.</p>
<h2>Updating dependencies and scripts</h2>
<p>To add Tailwind to this, let\u2019s - well - add tailwind.</p>
<pre class="${"language-fish"}"><!-- HTML_TAG_START -->${`<code class="language-fish">yarn add -D tailwindcss
npx tailwindcss init</code>`}<!-- HTML_TAG_END --></pre>
<p>In the <code>package.json</code> I added these two scripts:</p>
<pre class="${"language-json"}"><!-- HTML_TAG_START -->${`<code class="language-json"><span class="token property">"tailwind"</span><span class="token operator">:</span> <span class="token string">"npx tailwindcss -i ./static/input.css -o ./output.css"</span><span class="token punctuation">,</span>
<span class="token property">"tailwind:watch"</span><span class="token operator">:</span> <span class="token string">"npx tailwindcss -i ./static/input.css -o ./output.css --watch"</span><span class="token punctuation">,</span></code>`}<!-- HTML_TAG_END --></pre>
<p>also, I updated the dev and build scripts to include transpiling our CSS (you will need to install <a target="${"_blank"}" href="${"https://www.npmjs.com/package/concurrently"}">the <code>concurrently</code> package</a> globally if you haven\u2019t already).</p>
<pre class="${"language-json"}"><!-- HTML_TAG_START -->${`<code class="language-json"><span class="token property">"dev"</span><span class="token operator">:</span> <span class="token string">"concurrently "webpack-dev-server --mode development --open" "yarn run tailwind:watch""</span><span class="token punctuation">,</span>
<span class="token property">"build"</span><span class="token operator">:</span> <span class="token string">"yarn run tailwind &amp;&amp; webpack --mode production"</span><span class="token punctuation">,</span>
<span class="token property">"build:dev"</span><span class="token operator">:</span> <span class="token string">"yarn run tailwind &amp;&amp; webpack --mode development"</span><span class="token punctuation">,</span></code>`}<!-- HTML_TAG_END --></pre>
<h2>Overhauling config files</h2>
<p>Now simply tell tailwind which files to include via the <code>tailwind.config.js</code>:</p>
<pre class="${"language-js"}"><!-- HTML_TAG_START -->${`<code class="language-js">module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">&#123;</span>
  <span class="token literal-property property">content</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">'./src/**/*.rs'</span><span class="token punctuation">,</span> <span class="token string">'./static/index.html'</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token literal-property property">theme</span><span class="token operator">:</span> <span class="token punctuation">&#123;</span>
    <span class="token literal-property property">extend</span><span class="token operator">:</span> <span class="token punctuation">&#123;</span><span class="token punctuation">&#125;</span><span class="token punctuation">,</span>
  <span class="token punctuation">&#125;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">plugins</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token punctuation">&#125;</span></code>`}<!-- HTML_TAG_END --></pre>
<p>When examining the structure of our project, we can see that the styles are included in our app via the <code>bootstrap.js</code> file. So instead of the <code>styles.scss</code> (we can delete that), let\u2019s use our <code>output.css</code> file here.</p>
<p>We can also see, that there is some SCSS stuff going on, that we don\u2019t need, so let\u2019s clean that up, by removing the <code>sass</code> and <code>sass-loader</code> dependencies and telling webpack to test for <code>/\\.css$/i</code> instead of
<code>/\\.s[ac]ss$/i</code> in its config.</p>
<p>Lastly, we don\u2019t need the \u201Ctodomvc\u201D stylesheets, that are currently in the <code>index.html</code>\u2019s <code>head</code>, so we can delete those too.</p>
<p>There we go! Mission accomplished!</p>
<p><img src="${"https://media2.giphy.com/media/Od0QRnzwRBYmDU3eEO/giphy.gif?cid=ecf05e477is7007gzagd8wbnm42z4wc0v0x9mewd2puwxc4k&rid=giphy.gif&ct=g"}" alt="${"Very nice!"}"></p>
<h2>Some concerns</h2>
<p>There are still two things that need addressing though.</p>
<ol><li><p>If you are trying this by yourself, you will quickly realize, that Tailwind\u2019s Intellisense needs an extra invitation to our <code>.rs</code> files. This is easily done by adding <code>&quot;tailwindCSS.includeLanguages&quot;: {&quot;rust&quot;: &quot;html&quot;}</code> to your settings (this is how it works in VSCode, haven\u2019t tried it in other editors). After a reload tailwind should start working its magic for us in our Yew HTML macros, what a time to be alive!</p></li>
<li><p>Unfortunately, I haven\u2019t found a solution for this one. In all my other projects I use the <a target="${"_blank"}" href="${"https://github.com/tailwindlabs/prettier-plugin-tailwindcss"}">tailwind prettier plugin</a> to enforce its <a target="${"_blank"}" href="${"https://tailwindcss.com/blog/automatic-class-sorting-with-prettier#how-classes-are-sorted"}">recommended class order.</a></p></li>
<li><p>You will notice that with every save, the hot-reloading is triggered <em>twice</em>. Presumably, the second reload is triggered by the updated <code>output.css</code> file. This is of course not optimal, but I have also not found it to be a huge burden while developing.</p></li></ol>
<h2>Conclusion</h2>
<p>Aside from missing a few luxuries that the incredibly mature JavaScript ecosystem offers, I think this is a very comfortable way to leverage the powers of WebAssembly. In my opinion, the versatility of Tailwind adds immense value here, as both the technical, but also the mental overhead while developing are being kept to a minimum.</p>
<p>You find the finished setup <a href="${"https://github.com/Neugierdsnase/yew-wasm-pack-template"}" rel="${"nofollow"}">in this repository.</a></p>`;
        }
      })}`;
    });
  }
});

// .svelte-kit/output/server/chunks/publishedBlogposts-f2111c91.js
var blogPosts;
var init_publishedBlogposts_f2111c91 = __esm({
  ".svelte-kit/output/server/chunks/publishedBlogposts-f2111c91.js"() {
    init_comparing_tailwind_with_plain_css_is_wrong_md();
    init_youre_not_just_late_to_crypto_md();
    init_pythons_most_underrated_game_engine_md();
    init_pythons_most_underrated_game_engine_2_md();
    init_tailwind_with_webassembly_yew_md();
    blogPosts = [
      __spreadProps(__spreadValues({}, metadata3), {
        slug: "pythons-most-underrated-game-engine"
      }),
      __spreadProps(__spreadValues({}, metadata4), {
        slug: "pythons-most-underrated-game-engine-2"
      }),
      __spreadProps(__spreadValues({}, metadata), {
        slug: "comparing-tailwind-with-plain-css-is-wrong"
      }),
      __spreadProps(__spreadValues({}, metadata2), {
        slug: "youre-not-just-late-to-crypto"
      }),
      __spreadProps(__spreadValues({}, metadata5), {
        slug: "tailwind-with-webassembly-yew"
      })
    ].reverse();
  }
});

// .svelte-kit/output/server/entries/endpoints/rss.ts.js
var rss_ts_exports = {};
__export(rss_ts_exports, {
  get: () => get,
  prerender: () => prerender2
});
var import_clsx7, prerender2, headers, renderFeed, get;
var init_rss_ts = __esm({
  ".svelte-kit/output/server/entries/endpoints/rss.ts.js"() {
    init_publishedBlogposts_f2111c91();
    init_comparing_tailwind_with_plain_css_is_wrong_md();
    init_index_87d5ee21();
    init_BlogPostLayout_4a47a672();
    init_Article_700172e8();
    init_PageHeading_da33bb91();
    import_clsx7 = __toESM(require_clsx(), 1);
    init_youre_not_just_late_to_crypto_md();
    init_pythons_most_underrated_game_engine_md();
    init_pythons_most_underrated_game_engine_2_md();
    init_tailwind_with_webassembly_yew_md();
    prerender2 = true;
    headers = {
      "Cache-Control": `max-age=0, s-max-age=600`,
      "Content-Type": "application/xml"
    };
    renderFeed = (posts) => `<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <atom:link href="http://blog.vomkonstant.in/rss" rel="self" type="application/rss+xml" />
    <title>Konstantin Kovar</title>
    <link>https://blog.vomkonstant.in</link>
    <description>Blog vom Konstantin</description>
    ${posts.map(({
      title,
      published,
      slug,
      description,
      author
    }) => `<item>
      <guid>https://blog.vomkonstant.in/blog/${slug}</guid>
      <title>${title}</title>
      <link>https://blog.vomkonstant.in/blog/${slug}</link>
      <author>${author.split("<")[1].split(">")[0]}</author>
      ${description ? `<description>${description}</description>` : ""}
      <pubDate>${new Date(published).toUTCString()}</pubDate>
      </item>`).join("")}
  </channel>
</rss>
  `;
    get = () => {
      const body = renderFeed(blogPosts);
      return {
        body,
        headers
      };
    };
  }
});

// .svelte-kit/vercel-tmp/entry.js
var entry_exports = {};
__export(entry_exports, {
  default: () => entry_default
});
module.exports = __toCommonJS(entry_exports);

// .svelte-kit/vercel-tmp/shims.js
init_install_fetch();
installFetch();

// node_modules/@sveltejs/kit/dist/node.js
var import_stream = require("stream");
function get_raw_body(req) {
  return new Promise((fulfil, reject) => {
    const h2 = req.headers;
    if (!h2["content-type"]) {
      return fulfil(null);
    }
    req.on("error", reject);
    const length = Number(h2["content-length"]);
    if (isNaN(length) && h2["transfer-encoding"] == null) {
      return fulfil(null);
    }
    let data = new Uint8Array(length || 0);
    if (length > 0) {
      let offset = 0;
      req.on("data", (chunk) => {
        const new_len = offset + Buffer.byteLength(chunk);
        if (new_len > length) {
          return reject({
            status: 413,
            reason: 'Exceeded "Content-Length" limit'
          });
        }
        data.set(chunk, offset);
        offset = new_len;
      });
    } else {
      req.on("data", (chunk) => {
        const new_data = new Uint8Array(data.length + chunk.length);
        new_data.set(data, 0);
        new_data.set(chunk, data.length);
        data = new_data;
      });
    }
    req.on("end", () => {
      fulfil(data);
    });
  });
}
async function getRequest(base2, req) {
  let headers2 = req.headers;
  if (req.httpVersionMajor === 2) {
    headers2 = Object.assign({}, headers2);
    delete headers2[":method"];
    delete headers2[":path"];
    delete headers2[":authority"];
    delete headers2[":scheme"];
  }
  return new Request(base2 + req.url, {
    method: req.method,
    headers: headers2,
    body: await get_raw_body(req)
  });
}
async function setResponse(res, response) {
  const headers2 = Object.fromEntries(response.headers);
  if (response.headers.has("set-cookie")) {
    headers2["set-cookie"] = response.headers.raw()["set-cookie"];
  }
  res.writeHead(response.status, headers2);
  if (response.body instanceof import_stream.Readable) {
    response.body.pipe(res);
  } else {
    if (response.body) {
      res.write(await response.arrayBuffer());
    }
    res.end();
  }
}

// .svelte-kit/output/server/index.js
init_index_87d5ee21();
var __accessCheck2 = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet2 = (obj, member, getter) => {
  __accessCheck2(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd2 = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet2 = (obj, member, value, setter) => {
  __accessCheck2(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};
var _use_hashes;
var _dev;
var _script_needs_csp;
var _style_needs_csp;
var _directives;
var _script_src;
var _style_src;
function afterUpdate() {
}
var Root = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { stores } = $$props;
  let { page } = $$props;
  let { components } = $$props;
  let { props_0 = null } = $$props;
  let { props_1 = null } = $$props;
  let { props_2 = null } = $$props;
  setContext("__svelte__", stores);
  afterUpdate(stores.page.notify);
  if ($$props.stores === void 0 && $$bindings.stores && stores !== void 0)
    $$bindings.stores(stores);
  if ($$props.page === void 0 && $$bindings.page && page !== void 0)
    $$bindings.page(page);
  if ($$props.components === void 0 && $$bindings.components && components !== void 0)
    $$bindings.components(components);
  if ($$props.props_0 === void 0 && $$bindings.props_0 && props_0 !== void 0)
    $$bindings.props_0(props_0);
  if ($$props.props_1 === void 0 && $$bindings.props_1 && props_1 !== void 0)
    $$bindings.props_1(props_1);
  if ($$props.props_2 === void 0 && $$bindings.props_2 && props_2 !== void 0)
    $$bindings.props_2(props_2);
  {
    stores.page.set(page);
  }
  return `


${components[1] ? `${validate_component(components[0] || missing_component, "svelte:component").$$render($$result, Object.assign(props_0 || {}), {}, {
    default: () => {
      return `${components[2] ? `${validate_component(components[1] || missing_component, "svelte:component").$$render($$result, Object.assign(props_1 || {}), {}, {
        default: () => {
          return `${validate_component(components[2] || missing_component, "svelte:component").$$render($$result, Object.assign(props_2 || {}), {}, {})}`;
        }
      })}` : `${validate_component(components[1] || missing_component, "svelte:component").$$render($$result, Object.assign(props_1 || {}), {}, {})}`}`;
    }
  })}` : `${validate_component(components[0] || missing_component, "svelte:component").$$render($$result, Object.assign(props_0 || {}), {}, {})}`}

${``}`;
});
function to_headers(object) {
  const headers2 = new Headers();
  if (object) {
    for (const key2 in object) {
      const value = object[key2];
      if (!value)
        continue;
      if (Array.isArray(value)) {
        value.forEach((value2) => {
          headers2.append(key2, value2);
        });
      } else {
        headers2.set(key2, value);
      }
    }
  }
  return headers2;
}
function hash(value) {
  let hash2 = 5381;
  let i2 = value.length;
  if (typeof value === "string") {
    while (i2)
      hash2 = hash2 * 33 ^ value.charCodeAt(--i2);
  } else {
    while (i2)
      hash2 = hash2 * 33 ^ value[--i2];
  }
  return (hash2 >>> 0).toString(36);
}
function lowercase_keys(obj) {
  const clone2 = {};
  for (const key2 in obj) {
    clone2[key2.toLowerCase()] = obj[key2];
  }
  return clone2;
}
function decode_params(params) {
  for (const key2 in params) {
    params[key2] = params[key2].replace(/%23/g, "#").replace(/%3[Bb]/g, ";").replace(/%2[Cc]/g, ",").replace(/%2[Ff]/g, "/").replace(/%3[Ff]/g, "?").replace(/%3[Aa]/g, ":").replace(/%40/g, "@").replace(/%26/g, "&").replace(/%3[Dd]/g, "=").replace(/%2[Bb]/g, "+").replace(/%24/g, "$");
  }
  return params;
}
function is_pojo(body) {
  if (typeof body !== "object")
    return false;
  if (body) {
    if (body instanceof Uint8Array)
      return false;
    if (body._readableState && typeof body.pipe === "function")
      return false;
    if (typeof ReadableStream !== "undefined" && body instanceof ReadableStream)
      return false;
  }
  return true;
}
function normalize_request_method(event) {
  const method = event.request.method.toLowerCase();
  return method === "delete" ? "del" : method;
}
function error(body) {
  return new Response(body, {
    status: 500
  });
}
function is_string(s22) {
  return typeof s22 === "string" || s22 instanceof String;
}
var text_types = /* @__PURE__ */ new Set([
  "application/xml",
  "application/json",
  "application/x-www-form-urlencoded",
  "multipart/form-data"
]);
function is_text(content_type) {
  if (!content_type)
    return true;
  const type = content_type.split(";")[0].toLowerCase();
  return type.startsWith("text/") || type.endsWith("+xml") || text_types.has(type);
}
async function render_endpoint(event, mod) {
  const method = normalize_request_method(event);
  let handler = mod[method];
  if (!handler && method === "head") {
    handler = mod.get;
  }
  if (!handler) {
    return event.request.headers.get("x-sveltekit-load") ? new Response(void 0, {
      status: 204
    }) : new Response("Method not allowed", {
      status: 405
    });
  }
  const response = await handler(event);
  const preface = `Invalid response from route ${event.url.pathname}`;
  if (typeof response !== "object") {
    return error(`${preface}: expected an object, got ${typeof response}`);
  }
  if (response.fallthrough) {
    throw new Error("fallthrough is no longer supported. Use matchers instead: https://kit.svelte.dev/docs/routing#advanced-routing-matching");
  }
  const { status = 200, body = {} } = response;
  const headers2 = response.headers instanceof Headers ? new Headers(response.headers) : to_headers(response.headers);
  const type = headers2.get("content-type");
  if (!is_text(type) && !(body instanceof Uint8Array || is_string(body))) {
    return error(`${preface}: body must be an instance of string or Uint8Array if content-type is not a supported textual content-type`);
  }
  let normalized_body;
  if (is_pojo(body) && (!type || type.startsWith("application/json"))) {
    headers2.set("content-type", "application/json; charset=utf-8");
    normalized_body = JSON.stringify(body);
  } else {
    normalized_body = body;
  }
  if ((typeof normalized_body === "string" || normalized_body instanceof Uint8Array) && !headers2.has("etag")) {
    const cache_control = headers2.get("cache-control");
    if (!cache_control || !/(no-store|immutable)/.test(cache_control)) {
      headers2.set("etag", `"${hash(normalized_body)}"`);
    }
  }
  return new Response(method !== "head" ? normalized_body : void 0, {
    status,
    headers: headers2
  });
}
var chars$1 = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_$";
var unsafeChars = /[<>\b\f\n\r\t\0\u2028\u2029]/g;
var reserved = /^(?:do|if|in|for|int|let|new|try|var|byte|case|char|else|enum|goto|long|this|void|with|await|break|catch|class|const|final|float|short|super|throw|while|yield|delete|double|export|import|native|return|switch|throws|typeof|boolean|default|extends|finally|package|private|abstract|continue|debugger|function|volatile|interface|protected|transient|implements|instanceof|synchronized)$/;
var escaped2 = {
  "<": "\\u003C",
  ">": "\\u003E",
  "/": "\\u002F",
  "\\": "\\\\",
  "\b": "\\b",
  "\f": "\\f",
  "\n": "\\n",
  "\r": "\\r",
  "	": "\\t",
  "\0": "\\0",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
var objectProtoOwnPropertyNames = Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function devalue(value) {
  var counts = /* @__PURE__ */ new Map();
  function walk(thing) {
    if (typeof thing === "function") {
      throw new Error("Cannot stringify a function");
    }
    if (counts.has(thing)) {
      counts.set(thing, counts.get(thing) + 1);
      return;
    }
    counts.set(thing, 1);
    if (!isPrimitive(thing)) {
      var type = getType(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
        case "Date":
        case "RegExp":
          return;
        case "Array":
          thing.forEach(walk);
          break;
        case "Set":
        case "Map":
          Array.from(thing).forEach(walk);
          break;
        default:
          var proto = Object.getPrototypeOf(thing);
          if (proto !== Object.prototype && proto !== null && Object.getOwnPropertyNames(proto).sort().join("\0") !== objectProtoOwnPropertyNames) {
            throw new Error("Cannot stringify arbitrary non-POJOs");
          }
          if (Object.getOwnPropertySymbols(thing).length > 0) {
            throw new Error("Cannot stringify POJOs with symbolic keys");
          }
          Object.keys(thing).forEach(function(key2) {
            return walk(thing[key2]);
          });
      }
    }
  }
  walk(value);
  var names = /* @__PURE__ */ new Map();
  Array.from(counts).filter(function(entry4) {
    return entry4[1] > 1;
  }).sort(function(a, b) {
    return b[1] - a[1];
  }).forEach(function(entry4, i2) {
    names.set(entry4[0], getName(i2));
  });
  function stringify(thing) {
    if (names.has(thing)) {
      return names.get(thing);
    }
    if (isPrimitive(thing)) {
      return stringifyPrimitive(thing);
    }
    var type = getType(thing);
    switch (type) {
      case "Number":
      case "String":
      case "Boolean":
        return "Object(" + stringify(thing.valueOf()) + ")";
      case "RegExp":
        return "new RegExp(" + stringifyString(thing.source) + ', "' + thing.flags + '")';
      case "Date":
        return "new Date(" + thing.getTime() + ")";
      case "Array":
        var members = thing.map(function(v, i2) {
          return i2 in thing ? stringify(v) : "";
        });
        var tail = thing.length === 0 || thing.length - 1 in thing ? "" : ",";
        return "[" + members.join(",") + tail + "]";
      case "Set":
      case "Map":
        return "new " + type + "([" + Array.from(thing).map(stringify).join(",") + "])";
      default:
        var obj = "{" + Object.keys(thing).map(function(key2) {
          return safeKey(key2) + ":" + stringify(thing[key2]);
        }).join(",") + "}";
        var proto = Object.getPrototypeOf(thing);
        if (proto === null) {
          return Object.keys(thing).length > 0 ? "Object.assign(Object.create(null)," + obj + ")" : "Object.create(null)";
        }
        return obj;
    }
  }
  var str = stringify(value);
  if (names.size) {
    var params_1 = [];
    var statements_1 = [];
    var values_1 = [];
    names.forEach(function(name, thing) {
      params_1.push(name);
      if (isPrimitive(thing)) {
        values_1.push(stringifyPrimitive(thing));
        return;
      }
      var type = getType(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
          values_1.push("Object(" + stringify(thing.valueOf()) + ")");
          break;
        case "RegExp":
          values_1.push(thing.toString());
          break;
        case "Date":
          values_1.push("new Date(" + thing.getTime() + ")");
          break;
        case "Array":
          values_1.push("Array(" + thing.length + ")");
          thing.forEach(function(v, i2) {
            statements_1.push(name + "[" + i2 + "]=" + stringify(v));
          });
          break;
        case "Set":
          values_1.push("new Set");
          statements_1.push(name + "." + Array.from(thing).map(function(v) {
            return "add(" + stringify(v) + ")";
          }).join("."));
          break;
        case "Map":
          values_1.push("new Map");
          statements_1.push(name + "." + Array.from(thing).map(function(_a4) {
            var k = _a4[0], v = _a4[1];
            return "set(" + stringify(k) + ", " + stringify(v) + ")";
          }).join("."));
          break;
        default:
          values_1.push(Object.getPrototypeOf(thing) === null ? "Object.create(null)" : "{}");
          Object.keys(thing).forEach(function(key2) {
            statements_1.push("" + name + safeProp(key2) + "=" + stringify(thing[key2]));
          });
      }
    });
    statements_1.push("return " + str);
    return "(function(" + params_1.join(",") + "){" + statements_1.join(";") + "}(" + values_1.join(",") + "))";
  } else {
    return str;
  }
}
function getName(num) {
  var name = "";
  do {
    name = chars$1[num % chars$1.length] + name;
    num = ~~(num / chars$1.length) - 1;
  } while (num >= 0);
  return reserved.test(name) ? name + "_" : name;
}
function isPrimitive(thing) {
  return Object(thing) !== thing;
}
function stringifyPrimitive(thing) {
  if (typeof thing === "string")
    return stringifyString(thing);
  if (thing === void 0)
    return "void 0";
  if (thing === 0 && 1 / thing < 0)
    return "-0";
  var str = String(thing);
  if (typeof thing === "number")
    return str.replace(/^(-)?0\./, "$1.");
  return str;
}
function getType(thing) {
  return Object.prototype.toString.call(thing).slice(8, -1);
}
function escapeUnsafeChar(c) {
  return escaped2[c] || c;
}
function escapeUnsafeChars(str) {
  return str.replace(unsafeChars, escapeUnsafeChar);
}
function safeKey(key2) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key2) ? key2 : escapeUnsafeChars(JSON.stringify(key2));
}
function safeProp(key2) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key2) ? "." + key2 : "[" + escapeUnsafeChars(JSON.stringify(key2)) + "]";
}
function stringifyString(str) {
  var result = '"';
  for (var i2 = 0; i2 < str.length; i2 += 1) {
    var char = str.charAt(i2);
    var code = char.charCodeAt(0);
    if (char === '"') {
      result += '\\"';
    } else if (char in escaped2) {
      result += escaped2[char];
    } else if (code >= 55296 && code <= 57343) {
      var next = str.charCodeAt(i2 + 1);
      if (code <= 56319 && (next >= 56320 && next <= 57343)) {
        result += char + str[++i2];
      } else {
        result += "\\u" + code.toString(16).toUpperCase();
      }
    } else {
      result += char;
    }
  }
  result += '"';
  return result;
}
function noop2() {
}
function safe_not_equal(a, b) {
  return a != a ? b == b : a !== b || (a && typeof a === "object" || typeof a === "function");
}
Promise.resolve();
var subscriber_queue = [];
function readable(value, start) {
  return {
    subscribe: writable(value, start).subscribe
  };
}
function writable(value, start = noop2) {
  let stop;
  const subscribers = /* @__PURE__ */ new Set();
  function set(new_value) {
    if (safe_not_equal(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue.length;
        for (const subscriber of subscribers) {
          subscriber[1]();
          subscriber_queue.push(subscriber, value);
        }
        if (run_queue) {
          for (let i2 = 0; i2 < subscriber_queue.length; i2 += 2) {
            subscriber_queue[i2][0](subscriber_queue[i2 + 1]);
          }
          subscriber_queue.length = 0;
        }
      }
    }
  }
  function update(fn) {
    set(fn(value));
  }
  function subscribe(run2, invalidate = noop2) {
    const subscriber = [run2, invalidate];
    subscribers.add(subscriber);
    if (subscribers.size === 1) {
      stop = start(set) || noop2;
    }
    run2(value);
    return () => {
      subscribers.delete(subscriber);
      if (subscribers.size === 0) {
        stop();
        stop = null;
      }
    };
  }
  return { set, update, subscribe };
}
function coalesce_to_error(err) {
  return err instanceof Error || err && err.name && err.message ? err : new Error(JSON.stringify(err));
}
var render_json_payload_script_dict = {
  "<": "\\u003C",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
var render_json_payload_script_regex = new RegExp(`[${Object.keys(render_json_payload_script_dict).join("")}]`, "g");
function render_json_payload_script(attrs, payload) {
  const safe_payload = JSON.stringify(payload).replace(render_json_payload_script_regex, (match) => render_json_payload_script_dict[match]);
  let safe_attrs = "";
  for (const [key2, value] of Object.entries(attrs)) {
    if (value === void 0)
      continue;
    safe_attrs += ` sveltekit:data-${key2}=${escape_html_attr(value)}`;
  }
  return `<script type="application/json"${safe_attrs}>${safe_payload}<\/script>`;
}
var escape_html_attr_dict = {
  "&": "&amp;",
  '"': "&quot;"
};
var escape_html_attr_regex = new RegExp(`[${Object.keys(escape_html_attr_dict).join("")}]|[\\ud800-\\udbff](?![\\udc00-\\udfff])|[\\ud800-\\udbff][\\udc00-\\udfff]|[\\udc00-\\udfff]`, "g");
function escape_html_attr(str) {
  const escaped_str = str.replace(escape_html_attr_regex, (match) => {
    if (match.length === 2) {
      return match;
    }
    return escape_html_attr_dict[match] ?? `&#${match.charCodeAt(0)};`;
  });
  return `"${escaped_str}"`;
}
var s2 = JSON.stringify;
function create_prerendering_url_proxy(url) {
  return new Proxy(url, {
    get: (target, prop, receiver) => {
      if (prop === "search" || prop === "searchParams") {
        throw new Error(`Cannot access url.${prop} on a page with prerendering enabled`);
      }
      return Reflect.get(target, prop, receiver);
    }
  });
}
var encoder = new TextEncoder();
function sha256(data) {
  if (!key[0])
    precompute();
  const out = init.slice(0);
  const array = encode(data);
  for (let i2 = 0; i2 < array.length; i2 += 16) {
    const w = array.subarray(i2, i2 + 16);
    let tmp;
    let a;
    let b;
    let out0 = out[0];
    let out1 = out[1];
    let out2 = out[2];
    let out3 = out[3];
    let out4 = out[4];
    let out5 = out[5];
    let out6 = out[6];
    let out7 = out[7];
    for (let i22 = 0; i22 < 64; i22++) {
      if (i22 < 16) {
        tmp = w[i22];
      } else {
        a = w[i22 + 1 & 15];
        b = w[i22 + 14 & 15];
        tmp = w[i22 & 15] = (a >>> 7 ^ a >>> 18 ^ a >>> 3 ^ a << 25 ^ a << 14) + (b >>> 17 ^ b >>> 19 ^ b >>> 10 ^ b << 15 ^ b << 13) + w[i22 & 15] + w[i22 + 9 & 15] | 0;
      }
      tmp = tmp + out7 + (out4 >>> 6 ^ out4 >>> 11 ^ out4 >>> 25 ^ out4 << 26 ^ out4 << 21 ^ out4 << 7) + (out6 ^ out4 & (out5 ^ out6)) + key[i22];
      out7 = out6;
      out6 = out5;
      out5 = out4;
      out4 = out3 + tmp | 0;
      out3 = out2;
      out2 = out1;
      out1 = out0;
      out0 = tmp + (out1 & out2 ^ out3 & (out1 ^ out2)) + (out1 >>> 2 ^ out1 >>> 13 ^ out1 >>> 22 ^ out1 << 30 ^ out1 << 19 ^ out1 << 10) | 0;
    }
    out[0] = out[0] + out0 | 0;
    out[1] = out[1] + out1 | 0;
    out[2] = out[2] + out2 | 0;
    out[3] = out[3] + out3 | 0;
    out[4] = out[4] + out4 | 0;
    out[5] = out[5] + out5 | 0;
    out[6] = out[6] + out6 | 0;
    out[7] = out[7] + out7 | 0;
  }
  const bytes = new Uint8Array(out.buffer);
  reverse_endianness(bytes);
  return base64(bytes);
}
var init = new Uint32Array(8);
var key = new Uint32Array(64);
function precompute() {
  function frac(x2) {
    return (x2 - Math.floor(x2)) * 4294967296;
  }
  let prime = 2;
  for (let i2 = 0; i2 < 64; prime++) {
    let is_prime = true;
    for (let factor = 2; factor * factor <= prime; factor++) {
      if (prime % factor === 0) {
        is_prime = false;
        break;
      }
    }
    if (is_prime) {
      if (i2 < 8) {
        init[i2] = frac(prime ** (1 / 2));
      }
      key[i2] = frac(prime ** (1 / 3));
      i2++;
    }
  }
}
function reverse_endianness(bytes) {
  for (let i2 = 0; i2 < bytes.length; i2 += 4) {
    const a = bytes[i2 + 0];
    const b = bytes[i2 + 1];
    const c = bytes[i2 + 2];
    const d = bytes[i2 + 3];
    bytes[i2 + 0] = d;
    bytes[i2 + 1] = c;
    bytes[i2 + 2] = b;
    bytes[i2 + 3] = a;
  }
}
function encode(str) {
  const encoded = encoder.encode(str);
  const length = encoded.length * 8;
  const size = 512 * Math.ceil((length + 65) / 512);
  const bytes = new Uint8Array(size / 8);
  bytes.set(encoded);
  bytes[encoded.length] = 128;
  reverse_endianness(bytes);
  const words = new Uint32Array(bytes.buffer);
  words[words.length - 2] = Math.floor(length / 4294967296);
  words[words.length - 1] = length;
  return words;
}
var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");
function base64(bytes) {
  const l = bytes.length;
  let result = "";
  let i2;
  for (i2 = 2; i2 < l; i2 += 3) {
    result += chars[bytes[i2 - 2] >> 2];
    result += chars[(bytes[i2 - 2] & 3) << 4 | bytes[i2 - 1] >> 4];
    result += chars[(bytes[i2 - 1] & 15) << 2 | bytes[i2] >> 6];
    result += chars[bytes[i2] & 63];
  }
  if (i2 === l + 1) {
    result += chars[bytes[i2 - 2] >> 2];
    result += chars[(bytes[i2 - 2] & 3) << 4];
    result += "==";
  }
  if (i2 === l) {
    result += chars[bytes[i2 - 2] >> 2];
    result += chars[(bytes[i2 - 2] & 3) << 4 | bytes[i2 - 1] >> 4];
    result += chars[(bytes[i2 - 1] & 15) << 2];
    result += "=";
  }
  return result;
}
var csp_ready;
var generate_nonce;
var generate_hash;
if (typeof crypto !== "undefined") {
  const array = new Uint8Array(16);
  generate_nonce = () => {
    crypto.getRandomValues(array);
    return base64(array);
  };
  generate_hash = sha256;
} else {
  const name = "crypto";
  csp_ready = import(name).then((crypto2) => {
    generate_nonce = () => {
      return crypto2.randomBytes(16).toString("base64");
    };
    generate_hash = (input) => {
      return crypto2.createHash("sha256").update(input, "utf-8").digest().toString("base64");
    };
  });
}
var quoted = /* @__PURE__ */ new Set([
  "self",
  "unsafe-eval",
  "unsafe-hashes",
  "unsafe-inline",
  "none",
  "strict-dynamic",
  "report-sample"
]);
var crypto_pattern = /^(nonce|sha\d\d\d)-/;
var Csp = class {
  constructor({ mode, directives }, { dev, prerender: prerender3, needs_nonce }) {
    __privateAdd2(this, _use_hashes, void 0);
    __privateAdd2(this, _dev, void 0);
    __privateAdd2(this, _script_needs_csp, void 0);
    __privateAdd2(this, _style_needs_csp, void 0);
    __privateAdd2(this, _directives, void 0);
    __privateAdd2(this, _script_src, void 0);
    __privateAdd2(this, _style_src, void 0);
    __privateSet2(this, _use_hashes, mode === "hash" || mode === "auto" && prerender3);
    __privateSet2(this, _directives, dev ? __spreadValues({}, directives) : directives);
    __privateSet2(this, _dev, dev);
    const d = __privateGet2(this, _directives);
    if (dev) {
      const effective_style_src2 = d["style-src"] || d["default-src"];
      if (effective_style_src2 && !effective_style_src2.includes("unsafe-inline")) {
        d["style-src"] = [...effective_style_src2, "unsafe-inline"];
      }
    }
    __privateSet2(this, _script_src, []);
    __privateSet2(this, _style_src, []);
    const effective_script_src = d["script-src"] || d["default-src"];
    const effective_style_src = d["style-src"] || d["default-src"];
    __privateSet2(this, _script_needs_csp, !!effective_script_src && effective_script_src.filter((value) => value !== "unsafe-inline").length > 0);
    __privateSet2(this, _style_needs_csp, !dev && !!effective_style_src && effective_style_src.filter((value) => value !== "unsafe-inline").length > 0);
    this.script_needs_nonce = __privateGet2(this, _script_needs_csp) && !__privateGet2(this, _use_hashes);
    this.style_needs_nonce = __privateGet2(this, _style_needs_csp) && !__privateGet2(this, _use_hashes);
    if (this.script_needs_nonce || this.style_needs_nonce || needs_nonce) {
      this.nonce = generate_nonce();
    }
  }
  add_script(content) {
    if (__privateGet2(this, _script_needs_csp)) {
      if (__privateGet2(this, _use_hashes)) {
        __privateGet2(this, _script_src).push(`sha256-${generate_hash(content)}`);
      } else if (__privateGet2(this, _script_src).length === 0) {
        __privateGet2(this, _script_src).push(`nonce-${this.nonce}`);
      }
    }
  }
  add_style(content) {
    if (__privateGet2(this, _style_needs_csp)) {
      if (__privateGet2(this, _use_hashes)) {
        __privateGet2(this, _style_src).push(`sha256-${generate_hash(content)}`);
      } else if (__privateGet2(this, _style_src).length === 0) {
        __privateGet2(this, _style_src).push(`nonce-${this.nonce}`);
      }
    }
  }
  get_header(is_meta = false) {
    const header = [];
    const directives = __spreadValues({}, __privateGet2(this, _directives));
    if (__privateGet2(this, _style_src).length > 0) {
      directives["style-src"] = [
        ...directives["style-src"] || directives["default-src"] || [],
        ...__privateGet2(this, _style_src)
      ];
    }
    if (__privateGet2(this, _script_src).length > 0) {
      directives["script-src"] = [
        ...directives["script-src"] || directives["default-src"] || [],
        ...__privateGet2(this, _script_src)
      ];
    }
    for (const key2 in directives) {
      if (is_meta && (key2 === "frame-ancestors" || key2 === "report-uri" || key2 === "sandbox")) {
        continue;
      }
      const value = directives[key2];
      if (!value)
        continue;
      const directive = [key2];
      if (Array.isArray(value)) {
        value.forEach((value2) => {
          if (quoted.has(value2) || crypto_pattern.test(value2)) {
            directive.push(`'${value2}'`);
          } else {
            directive.push(value2);
          }
        });
      }
      header.push(directive.join(" "));
    }
    return header.join("; ");
  }
  get_meta() {
    const content = escape_html_attr(this.get_header(true));
    return `<meta http-equiv="content-security-policy" content=${content}>`;
  }
};
_use_hashes = /* @__PURE__ */ new WeakMap();
_dev = /* @__PURE__ */ new WeakMap();
_script_needs_csp = /* @__PURE__ */ new WeakMap();
_style_needs_csp = /* @__PURE__ */ new WeakMap();
_directives = /* @__PURE__ */ new WeakMap();
_script_src = /* @__PURE__ */ new WeakMap();
_style_src = /* @__PURE__ */ new WeakMap();
var updated = __spreadProps(__spreadValues({}, readable(false)), {
  check: () => false
});
async function render_response({
  branch,
  options,
  state,
  $session,
  page_config,
  status,
  error: error2 = null,
  event,
  resolve_opts,
  stuff
}) {
  if (state.prerender) {
    if (options.csp.mode === "nonce") {
      throw new Error('Cannot use prerendering if config.kit.csp.mode === "nonce"');
    }
    if (options.template_contains_nonce) {
      throw new Error("Cannot use prerendering if page template contains %svelte.nonce%");
    }
  }
  const stylesheets = new Set(options.manifest._.entry.css);
  const modulepreloads = new Set(options.manifest._.entry.js);
  const styles = /* @__PURE__ */ new Map();
  const serialized_data = [];
  let shadow_props;
  let rendered;
  let is_private = false;
  let maxage;
  if (error2) {
    error2.stack = options.get_stack(error2);
  }
  if (resolve_opts.ssr) {
    branch.forEach(({ node, props: props2, loaded, fetched, uses_credentials }) => {
      if (node.css)
        node.css.forEach((url) => stylesheets.add(url));
      if (node.js)
        node.js.forEach((url) => modulepreloads.add(url));
      if (node.styles)
        Object.entries(node.styles).forEach(([k, v]) => styles.set(k, v));
      if (fetched && page_config.hydrate)
        serialized_data.push(...fetched);
      if (props2)
        shadow_props = props2;
      if (uses_credentials)
        is_private = true;
      maxage = loaded.maxage;
    });
    const session = writable($session);
    const props = {
      stores: {
        page: writable(null),
        navigating: writable(null),
        session: __spreadProps(__spreadValues({}, session), {
          subscribe: (fn) => {
            is_private = true;
            return session.subscribe(fn);
          }
        }),
        updated
      },
      page: {
        error: error2,
        params: event.params,
        routeId: event.routeId,
        status,
        stuff,
        url: state.prerender ? create_prerendering_url_proxy(event.url) : event.url
      },
      components: branch.map(({ node }) => node.module.default)
    };
    const print_error = (property, replacement) => {
      Object.defineProperty(props.page, property, {
        get: () => {
          throw new Error(`$page.${property} has been replaced by $page.url.${replacement}`);
        }
      });
    };
    print_error("origin", "origin");
    print_error("path", "pathname");
    print_error("query", "searchParams");
    for (let i2 = 0; i2 < branch.length; i2 += 1) {
      props[`props_${i2}`] = await branch[i2].loaded.props;
    }
    rendered = options.root.render(props);
  } else {
    rendered = { head: "", html: "", css: { code: "", map: null } };
  }
  let { head, html: body } = rendered;
  const inlined_style = Array.from(styles.values()).join("\n");
  await csp_ready;
  const csp = new Csp(options.csp, {
    dev: options.dev,
    prerender: !!state.prerender,
    needs_nonce: options.template_contains_nonce
  });
  const target = hash(body);
  const init_app = `
		import { start } from ${s2(options.prefix + options.manifest._.entry.file)};
		start({
			target: document.querySelector('[data-hydrate="${target}"]').parentNode,
			paths: ${s2(options.paths)},
			session: ${try_serialize($session, (error3) => {
    throw new Error(`Failed to serialize session data: ${error3.message}`);
  })},
			route: ${!!page_config.router},
			spa: ${!resolve_opts.ssr},
			trailing_slash: ${s2(options.trailing_slash)},
			hydrate: ${resolve_opts.ssr && page_config.hydrate ? `{
				status: ${status},
				error: ${serialize_error(error2)},
				nodes: [
					${(branch || []).map(({ node }) => `import(${s2(options.prefix + node.entry)})`).join(",\n						")}
				],
				params: ${devalue(event.params)},
				routeId: ${s2(event.routeId)}
			}` : "null"}
		});
	`;
  const init_service_worker = `
		if ('serviceWorker' in navigator) {
			navigator.serviceWorker.register('${options.service_worker}');
		}
	`;
  if (options.amp) {
    const styles2 = `${inlined_style}
${rendered.css.code}`;
    head += `
		<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style>
		<noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
		<script async src="https://cdn.ampproject.org/v0.js"><\/script>

		<style amp-custom>${styles2}</style>`;
    if (options.service_worker) {
      head += '<script async custom-element="amp-install-serviceworker" src="https://cdn.ampproject.org/v0/amp-install-serviceworker-0.1.js"><\/script>';
      body += `<amp-install-serviceworker src="${options.service_worker}" layout="nodisplay"></amp-install-serviceworker>`;
    }
  } else {
    if (inlined_style) {
      const attributes = [];
      if (options.dev)
        attributes.push(" data-svelte");
      if (csp.style_needs_nonce)
        attributes.push(` nonce="${csp.nonce}"`);
      csp.add_style(inlined_style);
      head += `
	<style${attributes.join("")}>${inlined_style}</style>`;
    }
    head += Array.from(stylesheets).map((dep) => {
      const attributes = [
        'rel="stylesheet"',
        `href="${options.prefix + dep}"`
      ];
      if (csp.style_needs_nonce) {
        attributes.push(`nonce="${csp.nonce}"`);
      }
      if (styles.has(dep)) {
        attributes.push("disabled", 'media="(max-width: 0)"');
      }
      return `
	<link ${attributes.join(" ")}>`;
    }).join("");
    if (page_config.router || page_config.hydrate) {
      head += Array.from(modulepreloads).map((dep) => `
	<link rel="modulepreload" href="${options.prefix + dep}">`).join("");
      const attributes = ['type="module"', `data-hydrate="${target}"`];
      csp.add_script(init_app);
      if (csp.script_needs_nonce) {
        attributes.push(`nonce="${csp.nonce}"`);
      }
      body += `
		<script ${attributes.join(" ")}>${init_app}<\/script>`;
      body += serialized_data.map(({ url, body: body2, response }) => render_json_payload_script({ type: "data", url, body: typeof body2 === "string" ? hash(body2) : void 0 }, response)).join("\n	");
      if (shadow_props) {
        body += render_json_payload_script({ type: "props" }, shadow_props);
      }
    }
    if (options.service_worker) {
      csp.add_script(init_service_worker);
      head += `
				<script${csp.script_needs_nonce ? ` nonce="${csp.nonce}"` : ""}>${init_service_worker}<\/script>`;
    }
  }
  if (state.prerender && !options.amp) {
    const http_equiv = [];
    const csp_headers = csp.get_meta();
    if (csp_headers) {
      http_equiv.push(csp_headers);
    }
    if (maxage) {
      http_equiv.push(`<meta http-equiv="cache-control" content="max-age=${maxage}">`);
    }
    if (http_equiv.length > 0) {
      head = http_equiv.join("\n") + head;
    }
  }
  const segments = event.url.pathname.slice(options.paths.base.length).split("/").slice(2);
  const assets2 = options.paths.assets || (segments.length > 0 ? segments.map(() => "..").join("/") : ".");
  const html = await resolve_opts.transformPage({
    html: options.template({ head, body, assets: assets2, nonce: csp.nonce })
  });
  const headers2 = new Headers({
    "content-type": "text/html",
    etag: `"${hash(html)}"`
  });
  if (maxage) {
    headers2.set("cache-control", `${is_private ? "private" : "public"}, max-age=${maxage}`);
  }
  if (!options.floc) {
    headers2.set("permissions-policy", "interest-cohort=()");
  }
  if (!state.prerender) {
    const csp_header = csp.get_header();
    if (csp_header) {
      headers2.set("content-security-policy", csp_header);
    }
  }
  return new Response(html, {
    status,
    headers: headers2
  });
}
function try_serialize(data, fail) {
  try {
    return devalue(data);
  } catch (err) {
    if (fail)
      fail(coalesce_to_error(err));
    return null;
  }
}
function serialize_error(error2) {
  if (!error2)
    return null;
  let serialized = try_serialize(error2);
  if (!serialized) {
    const { name, message, stack } = error2;
    serialized = try_serialize(__spreadProps(__spreadValues({}, error2), { name, message, stack }));
  }
  if (!serialized) {
    serialized = "{}";
  }
  return serialized;
}
function normalize(loaded) {
  const has_error_status = loaded.status && loaded.status >= 400 && loaded.status <= 599 && !loaded.redirect;
  if (loaded.error || has_error_status) {
    const status = loaded.status;
    if (!loaded.error && has_error_status) {
      return { status: status || 500, error: new Error() };
    }
    const error2 = typeof loaded.error === "string" ? new Error(loaded.error) : loaded.error;
    if (!(error2 instanceof Error)) {
      return {
        status: 500,
        error: new Error(`"error" property returned from load() must be a string or instance of Error, received type "${typeof error2}"`)
      };
    }
    if (!status || status < 400 || status > 599) {
      console.warn('"error" returned from load() without a valid status code \u2014 defaulting to 500');
      return { status: 500, error: error2 };
    }
    return { status, error: error2 };
  }
  if (loaded.redirect) {
    if (!loaded.status || Math.floor(loaded.status / 100) !== 3) {
      return {
        status: 500,
        error: new Error('"redirect" property returned from load() must be accompanied by a 3xx status code')
      };
    }
    if (typeof loaded.redirect !== "string") {
      return {
        status: 500,
        error: new Error('"redirect" property returned from load() must be a string')
      };
    }
  }
  if (loaded.dependencies) {
    if (!Array.isArray(loaded.dependencies) || loaded.dependencies.some((dep) => typeof dep !== "string")) {
      return {
        status: 500,
        error: new Error('"dependencies" property returned from load() must be of type string[]')
      };
    }
  }
  if (loaded.context) {
    throw new Error('You are returning "context" from a load function. "context" was renamed to "stuff", please adjust your code accordingly.');
  }
  return loaded;
}
var absolute = /^([a-z]+:)?\/?\//;
var scheme = /^[a-z]+:/;
function resolve(base2, path) {
  if (scheme.test(path))
    return path;
  const base_match = absolute.exec(base2);
  const path_match = absolute.exec(path);
  if (!base_match) {
    throw new Error(`bad base path: "${base2}"`);
  }
  const baseparts = path_match ? [] : base2.slice(base_match[0].length).split("/");
  const pathparts = path_match ? path.slice(path_match[0].length).split("/") : path.split("/");
  baseparts.pop();
  for (let i2 = 0; i2 < pathparts.length; i2 += 1) {
    const part = pathparts[i2];
    if (part === ".")
      continue;
    else if (part === "..")
      baseparts.pop();
    else
      baseparts.push(part);
  }
  const prefix = path_match && path_match[0] || base_match && base_match[0] || "";
  return `${prefix}${baseparts.join("/")}`;
}
function is_root_relative(path) {
  return path[0] === "/" && path[1] !== "/";
}
function normalize_path(path, trailing_slash) {
  if (path === "/" || trailing_slash === "ignore")
    return path;
  if (trailing_slash === "never") {
    return path.endsWith("/") ? path.slice(0, -1) : path;
  } else if (trailing_slash === "always" && /\/[^./]+$/.test(path)) {
    return path + "/";
  }
  return path;
}
async function load_node({
  event,
  options,
  state,
  route,
  node,
  $session,
  stuff,
  is_error,
  is_leaf,
  status,
  error: error2
}) {
  const { module: module2 } = node;
  let uses_credentials = false;
  const fetched = [];
  let set_cookie_headers = [];
  let loaded;
  const shadow = is_leaf ? await load_shadow_data(route, event, options, !!state.prerender) : {};
  if (shadow.cookies) {
    set_cookie_headers.push(...shadow.cookies);
  }
  if (shadow.error) {
    loaded = {
      status: shadow.status,
      error: shadow.error
    };
  } else if (shadow.redirect) {
    loaded = {
      status: shadow.status,
      redirect: shadow.redirect
    };
  } else if (module2.load) {
    const load_input = {
      url: state.prerender ? create_prerendering_url_proxy(event.url) : event.url,
      params: event.params,
      props: shadow.body || {},
      routeId: event.routeId,
      get session() {
        uses_credentials = true;
        return $session;
      },
      fetch: async (resource, opts = {}) => {
        let requested;
        if (typeof resource === "string") {
          requested = resource;
        } else {
          requested = resource.url;
          opts = __spreadValues({
            method: resource.method,
            headers: resource.headers,
            body: resource.body,
            mode: resource.mode,
            credentials: resource.credentials,
            cache: resource.cache,
            redirect: resource.redirect,
            referrer: resource.referrer,
            integrity: resource.integrity
          }, opts);
        }
        opts.headers = new Headers(opts.headers);
        for (const [key2, value] of event.request.headers) {
          if (key2 !== "authorization" && key2 !== "cookie" && key2 !== "host" && key2 !== "if-none-match" && !opts.headers.has(key2)) {
            opts.headers.set(key2, value);
          }
        }
        const resolved = resolve(event.url.pathname, requested.split("?")[0]);
        let response;
        let dependency;
        const prefix = options.paths.assets || options.paths.base;
        const filename = decodeURIComponent(resolved.startsWith(prefix) ? resolved.slice(prefix.length) : resolved).slice(1);
        const filename_html = `${filename}/index.html`;
        const is_asset = options.manifest.assets.has(filename);
        const is_asset_html = options.manifest.assets.has(filename_html);
        if (is_asset || is_asset_html) {
          const file = is_asset ? filename : filename_html;
          if (options.read) {
            const type = is_asset ? options.manifest.mimeTypes[filename.slice(filename.lastIndexOf("."))] : "text/html";
            response = new Response(options.read(file), {
              headers: type ? { "content-type": type } : {}
            });
          } else {
            response = await fetch(`${event.url.origin}/${file}`, opts);
          }
        } else if (is_root_relative(resolved)) {
          if (opts.credentials !== "omit") {
            uses_credentials = true;
            const cookie = event.request.headers.get("cookie");
            const authorization = event.request.headers.get("authorization");
            if (cookie) {
              opts.headers.set("cookie", cookie);
            }
            if (authorization && !opts.headers.has("authorization")) {
              opts.headers.set("authorization", authorization);
            }
          }
          if (opts.body && typeof opts.body !== "string") {
            throw new Error("Request body must be a string");
          }
          response = await respond(new Request(new URL(requested, event.url).href, __spreadProps(__spreadValues({}, opts), { credentials: void 0 })), options, __spreadProps(__spreadValues({}, state), {
            initiator: route
          }));
          if (state.prerender) {
            dependency = { response, body: null };
            state.prerender.dependencies.set(resolved, dependency);
          }
        } else {
          if (resolved.startsWith("//")) {
            requested = event.url.protocol + requested;
          }
          if (`.${new URL(requested).hostname}`.endsWith(`.${event.url.hostname}`) && opts.credentials !== "omit") {
            uses_credentials = true;
            const cookie = event.request.headers.get("cookie");
            if (cookie)
              opts.headers.set("cookie", cookie);
          }
          const external_request = new Request(requested, opts);
          response = await options.hooks.externalFetch.call(null, external_request);
        }
        const proxy = new Proxy(response, {
          get(response2, key2, _receiver) {
            async function text() {
              const body = await response2.text();
              const headers2 = {};
              for (const [key3, value] of response2.headers) {
                if (key3 === "set-cookie") {
                  set_cookie_headers = set_cookie_headers.concat(value);
                } else if (key3 !== "etag") {
                  headers2[key3] = value;
                }
              }
              if (!opts.body || typeof opts.body === "string") {
                const status_number = Number(response2.status);
                if (isNaN(status_number)) {
                  throw new Error(`response.status is not a number. value: "${response2.status}" type: ${typeof response2.status}`);
                }
                fetched.push({
                  url: requested,
                  body: opts.body,
                  response: {
                    status: status_number,
                    statusText: response2.statusText,
                    headers: headers2,
                    body
                  }
                });
              }
              if (dependency) {
                dependency.body = body;
              }
              return body;
            }
            if (key2 === "arrayBuffer") {
              return async () => {
                const buffer = await response2.arrayBuffer();
                if (dependency) {
                  dependency.body = new Uint8Array(buffer);
                }
                return buffer;
              };
            }
            if (key2 === "text") {
              return text;
            }
            if (key2 === "json") {
              return async () => {
                return JSON.parse(await text());
              };
            }
            return Reflect.get(response2, key2, response2);
          }
        });
        return proxy;
      },
      stuff: __spreadValues({}, stuff),
      status: is_error ? status ?? null : null,
      error: is_error ? error2 ?? null : null
    };
    if (options.dev) {
      Object.defineProperty(load_input, "page", {
        get: () => {
          throw new Error("`page` in `load` functions has been replaced by `url` and `params`");
        }
      });
    }
    loaded = await module2.load.call(null, load_input);
    if (!loaded) {
      throw new Error(`load function must return a value${options.dev ? ` (${node.entry})` : ""}`);
    }
    if (loaded.fallthrough) {
      throw new Error("fallthrough is no longer supported. Use matchers instead: https://kit.svelte.dev/docs/routing#advanced-routing-matching");
    }
  } else if (shadow.body) {
    loaded = {
      props: shadow.body
    };
  } else {
    loaded = {};
  }
  if (shadow.body && state.prerender) {
    const pathname = `${event.url.pathname.replace(/\/$/, "")}/__data.json`;
    const dependency = {
      response: new Response(void 0),
      body: JSON.stringify(shadow.body)
    };
    state.prerender.dependencies.set(pathname, dependency);
  }
  return {
    node,
    props: shadow.body,
    loaded: normalize(loaded),
    stuff: loaded.stuff || stuff,
    fetched,
    set_cookie_headers,
    uses_credentials
  };
}
async function load_shadow_data(route, event, options, prerender3) {
  if (!route.shadow)
    return {};
  try {
    const mod = await route.shadow();
    if (prerender3 && (mod.post || mod.put || mod.del || mod.patch)) {
      throw new Error("Cannot prerender pages that have endpoints with mutative methods");
    }
    const method = normalize_request_method(event);
    const is_get = method === "head" || method === "get";
    const handler = method === "head" ? mod.head || mod.get : mod[method];
    if (!handler && !is_get) {
      return {
        status: 405,
        error: new Error(`${method} method not allowed`)
      };
    }
    const data = {
      status: 200,
      cookies: [],
      body: {}
    };
    if (!is_get) {
      const result = await handler(event);
      if (result.fallthrough) {
        throw new Error("fallthrough is no longer supported. Use matchers instead: https://kit.svelte.dev/docs/routing#advanced-routing-matching");
      }
      const { status, headers: headers2, body } = validate_shadow_output(result);
      data.status = status;
      add_cookies(data.cookies, headers2);
      if (status >= 300 && status < 400) {
        data.redirect = headers2 instanceof Headers ? headers2.get("location") : headers2.location;
        return data;
      }
      data.body = body;
    }
    const get2 = method === "head" && mod.head || mod.get;
    if (get2) {
      const result = await get2(event);
      if (result.fallthrough) {
        throw new Error("fallthrough is no longer supported. Use matchers instead: https://kit.svelte.dev/docs/routing#advanced-routing-matching");
      }
      const { status, headers: headers2, body } = validate_shadow_output(result);
      add_cookies(data.cookies, headers2);
      data.status = status;
      if (status >= 400) {
        data.error = new Error("Failed to load data");
        return data;
      }
      if (status >= 300) {
        data.redirect = headers2 instanceof Headers ? headers2.get("location") : headers2.location;
        return data;
      }
      data.body = __spreadValues(__spreadValues({}, body), data.body);
    }
    return data;
  } catch (e2) {
    const error2 = coalesce_to_error(e2);
    options.handle_error(error2, event);
    return {
      status: 500,
      error: error2
    };
  }
}
function add_cookies(target, headers2) {
  const cookies = headers2["set-cookie"];
  if (cookies) {
    if (Array.isArray(cookies)) {
      target.push(...cookies);
    } else {
      target.push(cookies);
    }
  }
}
function validate_shadow_output(result) {
  const { status = 200, body = {} } = result;
  let headers2 = result.headers || {};
  if (headers2 instanceof Headers) {
    if (headers2.has("set-cookie")) {
      throw new Error("Endpoint request handler cannot use Headers interface with Set-Cookie headers");
    }
  } else {
    headers2 = lowercase_keys(headers2);
  }
  if (!is_pojo(body)) {
    throw new Error("Body returned from endpoint request handler must be a plain object");
  }
  return { status, headers: headers2, body };
}
async function respond_with_error({
  event,
  options,
  state,
  $session,
  status,
  error: error2,
  resolve_opts
}) {
  try {
    const branch = [];
    let stuff = {};
    if (resolve_opts.ssr) {
      const default_layout = await options.manifest._.nodes[0]();
      const default_error = await options.manifest._.nodes[1]();
      const layout_loaded = await load_node({
        event,
        options,
        state,
        route: null,
        node: default_layout,
        $session,
        stuff: {},
        is_error: false,
        is_leaf: false
      });
      const error_loaded = await load_node({
        event,
        options,
        state,
        route: null,
        node: default_error,
        $session,
        stuff: layout_loaded ? layout_loaded.stuff : {},
        is_error: true,
        is_leaf: false,
        status,
        error: error2
      });
      branch.push(layout_loaded, error_loaded);
      stuff = error_loaded.stuff;
    }
    return await render_response({
      options,
      state,
      $session,
      page_config: {
        hydrate: options.hydrate,
        router: options.router
      },
      stuff,
      status,
      error: error2,
      branch,
      event,
      resolve_opts
    });
  } catch (err) {
    const error3 = coalesce_to_error(err);
    options.handle_error(error3, event);
    return new Response(error3.stack, {
      status: 500
    });
  }
}
async function respond$1(opts) {
  const { event, options, state, $session, route, resolve_opts } = opts;
  let nodes;
  if (!resolve_opts.ssr) {
    return await render_response(__spreadProps(__spreadValues({}, opts), {
      branch: [],
      page_config: {
        hydrate: true,
        router: true
      },
      status: 200,
      error: null,
      event,
      stuff: {}
    }));
  }
  try {
    nodes = await Promise.all(route.a.map((n) => n == void 0 ? n : options.manifest._.nodes[n]()));
  } catch (err) {
    const error3 = coalesce_to_error(err);
    options.handle_error(error3, event);
    return await respond_with_error({
      event,
      options,
      state,
      $session,
      status: 500,
      error: error3,
      resolve_opts
    });
  }
  const leaf = nodes[nodes.length - 1].module;
  let page_config = get_page_config(leaf, options);
  if (state.prerender) {
    const should_prerender = leaf.prerender ?? state.prerender.default;
    if (!should_prerender) {
      return new Response(void 0, {
        status: 204
      });
    }
  }
  let branch = [];
  let status = 200;
  let error2 = null;
  let set_cookie_headers = [];
  let stuff = {};
  ssr:
    if (resolve_opts.ssr) {
      for (let i2 = 0; i2 < nodes.length; i2 += 1) {
        const node = nodes[i2];
        let loaded;
        if (node) {
          try {
            loaded = await load_node(__spreadProps(__spreadValues({}, opts), {
              node,
              stuff,
              is_error: false,
              is_leaf: i2 === nodes.length - 1
            }));
            set_cookie_headers = set_cookie_headers.concat(loaded.set_cookie_headers);
            if (loaded.loaded.redirect) {
              return with_cookies(new Response(void 0, {
                status: loaded.loaded.status,
                headers: {
                  location: loaded.loaded.redirect
                }
              }), set_cookie_headers);
            }
            if (loaded.loaded.error) {
              ({ status, error: error2 } = loaded.loaded);
            }
          } catch (err) {
            const e2 = coalesce_to_error(err);
            options.handle_error(e2, event);
            status = 500;
            error2 = e2;
          }
          if (loaded && !error2) {
            branch.push(loaded);
          }
          if (error2) {
            while (i2--) {
              if (route.b[i2]) {
                const index = route.b[i2];
                const error_node = await options.manifest._.nodes[index]();
                let node_loaded;
                let j = i2;
                while (!(node_loaded = branch[j])) {
                  j -= 1;
                }
                try {
                  const error_loaded = await load_node(__spreadProps(__spreadValues({}, opts), {
                    node: error_node,
                    stuff: node_loaded.stuff,
                    is_error: true,
                    is_leaf: false,
                    status,
                    error: error2
                  }));
                  if (error_loaded.loaded.error) {
                    continue;
                  }
                  page_config = get_page_config(error_node.module, options);
                  branch = branch.slice(0, j + 1).concat(error_loaded);
                  stuff = __spreadValues(__spreadValues({}, node_loaded.stuff), error_loaded.stuff);
                  break ssr;
                } catch (err) {
                  const e2 = coalesce_to_error(err);
                  options.handle_error(e2, event);
                  continue;
                }
              }
            }
            return with_cookies(await respond_with_error({
              event,
              options,
              state,
              $session,
              status,
              error: error2,
              resolve_opts
            }), set_cookie_headers);
          }
        }
        if (loaded && loaded.loaded.stuff) {
          stuff = __spreadValues(__spreadValues({}, stuff), loaded.loaded.stuff);
        }
      }
    }
  try {
    return with_cookies(await render_response(__spreadProps(__spreadValues({}, opts), {
      stuff,
      event,
      page_config,
      status,
      error: error2,
      branch: branch.filter(Boolean)
    })), set_cookie_headers);
  } catch (err) {
    const error3 = coalesce_to_error(err);
    options.handle_error(error3, event);
    return with_cookies(await respond_with_error(__spreadProps(__spreadValues({}, opts), {
      status: 500,
      error: error3
    })), set_cookie_headers);
  }
}
function get_page_config(leaf, options) {
  if ("ssr" in leaf) {
    throw new Error("`export const ssr` has been removed \u2014 use the handle hook instead: https://kit.svelte.dev/docs/hooks#handle");
  }
  return {
    router: "router" in leaf ? !!leaf.router : options.router,
    hydrate: "hydrate" in leaf ? !!leaf.hydrate : options.hydrate
  };
}
function with_cookies(response, set_cookie_headers) {
  if (set_cookie_headers.length) {
    set_cookie_headers.forEach((value) => {
      response.headers.append("set-cookie", value);
    });
  }
  return response;
}
async function render_page(event, route, options, state, resolve_opts) {
  if (state.initiator === route) {
    return new Response(`Not found: ${event.url.pathname}`, {
      status: 404
    });
  }
  if (route.shadow) {
    const type = negotiate(event.request.headers.get("accept") || "text/html", [
      "text/html",
      "application/json"
    ]);
    if (type === "application/json") {
      return render_endpoint(event, await route.shadow());
    }
  }
  const $session = await options.hooks.getSession(event);
  return respond$1({
    event,
    options,
    state,
    $session,
    resolve_opts,
    route
  });
}
function negotiate(accept, types2) {
  const parts = accept.split(",").map((str, i2) => {
    const match = /([^/]+)\/([^;]+)(?:;q=([0-9.]+))?/.exec(str);
    if (match) {
      const [, type, subtype, q = "1"] = match;
      return { type, subtype, q: +q, i: i2 };
    }
    throw new Error(`Invalid Accept header: ${accept}`);
  }).sort((a, b) => {
    if (a.q !== b.q) {
      return b.q - a.q;
    }
    if (a.subtype === "*" !== (b.subtype === "*")) {
      return a.subtype === "*" ? 1 : -1;
    }
    if (a.type === "*" !== (b.type === "*")) {
      return a.type === "*" ? 1 : -1;
    }
    return a.i - b.i;
  });
  let accepted;
  let min_priority = Infinity;
  for (const mimetype of types2) {
    const [type, subtype] = mimetype.split("/");
    const priority = parts.findIndex((part) => (part.type === type || part.type === "*") && (part.subtype === subtype || part.subtype === "*"));
    if (priority !== -1 && priority < min_priority) {
      accepted = mimetype;
      min_priority = priority;
    }
  }
  return accepted;
}
function exec(match, names, types2, matchers) {
  const params = {};
  for (let i2 = 0; i2 < names.length; i2 += 1) {
    const name = names[i2];
    const type = types2[i2];
    const value = match[i2 + 1] || "";
    if (type) {
      const matcher = matchers[type];
      if (!matcher)
        throw new Error(`Missing "${type}" param matcher`);
      if (!matcher(value))
        return;
    }
    params[name] = value;
  }
  return params;
}
var DATA_SUFFIX = "/__data.json";
var default_transform = ({ html }) => html;
async function respond(request, options, state) {
  var _a4, _b, _c;
  let url = new URL(request.url);
  const normalized = normalize_path(url.pathname, options.trailing_slash);
  if (normalized !== url.pathname && !((_a4 = state.prerender) == null ? void 0 : _a4.fallback)) {
    return new Response(void 0, {
      status: 301,
      headers: {
        location: (normalized.startsWith("//") ? url.origin + normalized : normalized) + (url.search === "?" ? "" : url.search)
      }
    });
  }
  const { parameter, allowed } = options.method_override;
  const method_override = (_b = url.searchParams.get(parameter)) == null ? void 0 : _b.toUpperCase();
  if (method_override) {
    if (request.method === "POST") {
      if (allowed.includes(method_override)) {
        request = new Proxy(request, {
          get: (target, property, _receiver) => {
            if (property === "method")
              return method_override;
            return Reflect.get(target, property, target);
          }
        });
      } else {
        const verb = allowed.length === 0 ? "enabled" : "allowed";
        const body = `${parameter}=${method_override} is not ${verb}. See https://kit.svelte.dev/docs/configuration#methodoverride`;
        return new Response(body, {
          status: 400
        });
      }
    } else {
      throw new Error(`${parameter}=${method_override} is only allowed with POST requests`);
    }
  }
  let decoded = decodeURI(url.pathname);
  let route = null;
  let params = {};
  if (options.paths.base && !((_c = state.prerender) == null ? void 0 : _c.fallback)) {
    if (!decoded.startsWith(options.paths.base)) {
      return new Response(void 0, { status: 404 });
    }
    decoded = decoded.slice(options.paths.base.length) || "/";
  }
  const is_data_request = decoded.endsWith(DATA_SUFFIX);
  if (is_data_request) {
    decoded = decoded.slice(0, -DATA_SUFFIX.length) || "/";
    const normalized2 = normalize_path(url.pathname.slice(0, -DATA_SUFFIX.length), options.trailing_slash);
    url = new URL(url.origin + normalized2 + url.search);
  }
  if (!state.prerender || !state.prerender.fallback) {
    const matchers = await options.manifest._.matchers();
    for (const candidate of options.manifest._.routes) {
      const match = candidate.pattern.exec(decoded);
      if (!match)
        continue;
      const matched = exec(match, candidate.names, candidate.types, matchers);
      if (matched) {
        route = candidate;
        params = decode_params(matched);
        break;
      }
    }
  }
  const event = {
    get clientAddress() {
      if (!state.getClientAddress) {
        throw new Error(`${"@sveltejs/adapter-vercel"} does not specify getClientAddress. Please raise an issue`);
      }
      Object.defineProperty(event, "clientAddress", {
        value: state.getClientAddress()
      });
      return event.clientAddress;
    },
    locals: {},
    params,
    platform: state.platform,
    request,
    routeId: route && route.id,
    url
  };
  const removed = (property, replacement, suffix = "") => ({
    get: () => {
      throw new Error(`event.${property} has been replaced by event.${replacement}` + suffix);
    }
  });
  const details = ". See https://github.com/sveltejs/kit/pull/3384 for details";
  const body_getter = {
    get: () => {
      throw new Error("To access the request body use the text/json/arrayBuffer/formData methods, e.g. `body = await request.json()`" + details);
    }
  };
  Object.defineProperties(event, {
    method: removed("method", "request.method", details),
    headers: removed("headers", "request.headers", details),
    origin: removed("origin", "url.origin"),
    path: removed("path", "url.pathname"),
    query: removed("query", "url.searchParams"),
    body: body_getter,
    rawBody: body_getter
  });
  let resolve_opts = {
    ssr: true,
    transformPage: default_transform
  };
  try {
    const response = await options.hooks.handle({
      event,
      resolve: async (event2, opts) => {
        if (opts) {
          resolve_opts = {
            ssr: opts.ssr !== false,
            transformPage: opts.transformPage || default_transform
          };
        }
        if (state.prerender && state.prerender.fallback) {
          return await render_response({
            event: event2,
            options,
            state,
            $session: await options.hooks.getSession(event2),
            page_config: { router: true, hydrate: true },
            stuff: {},
            status: 200,
            error: null,
            branch: [],
            resolve_opts: __spreadProps(__spreadValues({}, resolve_opts), {
              ssr: false
            })
          });
        }
        if (route) {
          let response2;
          if (is_data_request && route.type === "page" && route.shadow) {
            response2 = await render_endpoint(event2, await route.shadow());
            if (request.headers.has("x-sveltekit-load")) {
              if (response2.status >= 300 && response2.status < 400) {
                const location = response2.headers.get("location");
                if (location) {
                  const headers2 = new Headers(response2.headers);
                  headers2.set("x-sveltekit-location", location);
                  response2 = new Response(void 0, {
                    status: 204,
                    headers: headers2
                  });
                }
              }
            }
          } else {
            response2 = route.type === "endpoint" ? await render_endpoint(event2, await route.load()) : await render_page(event2, route, options, state, resolve_opts);
          }
          if (response2) {
            if (response2.status === 200 && response2.headers.has("etag")) {
              let if_none_match_value = request.headers.get("if-none-match");
              if (if_none_match_value == null ? void 0 : if_none_match_value.startsWith('W/"')) {
                if_none_match_value = if_none_match_value.substring(2);
              }
              const etag = response2.headers.get("etag");
              if (if_none_match_value === etag) {
                const headers2 = new Headers({ etag });
                for (const key2 of [
                  "cache-control",
                  "content-location",
                  "date",
                  "expires",
                  "vary"
                ]) {
                  const value = response2.headers.get(key2);
                  if (value)
                    headers2.set(key2, value);
                }
                return new Response(void 0, {
                  status: 304,
                  headers: headers2
                });
              }
            }
            return response2;
          }
        }
        if (!state.initiator) {
          const $session = await options.hooks.getSession(event2);
          return await respond_with_error({
            event: event2,
            options,
            state,
            $session,
            status: 404,
            error: new Error(`Not found: ${event2.url.pathname}`),
            resolve_opts
          });
        }
        if (state.prerender) {
          return new Response("not found", { status: 404 });
        }
        return await fetch(request);
      },
      get request() {
        throw new Error("request in handle has been replaced with event" + details);
      }
    });
    if (response && !(response instanceof Response)) {
      throw new Error("handle must return a Response object" + details);
    }
    return response;
  } catch (e2) {
    const error2 = coalesce_to_error(e2);
    options.handle_error(error2, event);
    try {
      const $session = await options.hooks.getSession(event);
      return await respond_with_error({
        event,
        options,
        state,
        $session,
        status: 500,
        error: error2,
        resolve_opts
      });
    } catch (e22) {
      const error3 = coalesce_to_error(e22);
      return new Response(options.dev ? error3.stack : error3.message, {
        status: 500
      });
    }
  }
}
var base = "";
var assets = "";
function set_paths(paths) {
  base = paths.base;
  assets = paths.assets || base;
}
var template = ({ head, body, assets: assets2, nonce }) => '<!DOCTYPE html>\n<html lang="en">\n  <head>\n    <meta charset="utf-8" />\n    <meta name="description" content="" />\n    <link rel="icon" href="' + assets2 + '/favicon.png" />\n    <link\n      href="' + assets2 + '/syntaxHighlighting.css"\n      rel="stylesheet"\n      type="text/css"\n    />\n    <meta\n      name="viewport"\n      content="width=device-width, initial-scale=1"\n    />\n    ' + head + "\n    <style>\n      @font-face {\n        font-family: 'Lora';\n        font-style: normal;\n        font-display: swap;\n        font-weight: 400;\n        src: local('Lora'), local('Lora Regular'),\n          local('Lora-VariableFont_wght'),\n          url('../static/fonts/Lora.ttf') format('ttf');\n      }\n\n      @font-face {\n        font-family: 'Lora';\n        font-style: italic;\n        font-display: swap;\n        font-weight: 400;\n        src: local('Lora'), local('Lora Italic'),\n          local('Lora-Italic-VariableFont_wght'),\n          url('../static/fonts/Lora-Italic.ttf')\n            format('ttf');\n      }\n    </style>\n  </head>\n  <body>\n    <div>" + body + '</div>\n    <script\n      defer\n      data-goatcounter="https://neugierdsnase.goatcounter.com/count"\n      async\n      src="//gc.zgo.at/count.js"\n    ><\/script>\n  </body>\n</html>\n';
var read = null;
set_paths({ "base": "", "assets": "" });
var Server = class {
  constructor(manifest2) {
    this.options = {
      amp: false,
      csp: { "mode": "auto", "directives": { "upgrade-insecure-requests": false, "block-all-mixed-content": false } },
      dev: false,
      floc: false,
      get_stack: (error2) => String(error2),
      handle_error: (error2, event) => {
        this.options.hooks.handleError({
          error: error2,
          event,
          get request() {
            throw new Error("request in handleError has been replaced with event. See https://github.com/sveltejs/kit/pull/3384 for details");
          }
        });
        error2.stack = this.options.get_stack(error2);
      },
      hooks: null,
      hydrate: true,
      manifest: manifest2,
      method_override: { "parameter": "_method", "allowed": [] },
      paths: { base, assets },
      prefix: assets + "/_app/",
      prerender: true,
      read,
      root: Root,
      service_worker: null,
      router: true,
      template,
      template_contains_nonce: false,
      trailing_slash: "never"
    };
  }
  async respond(request, options = {}) {
    if (!(request instanceof Request)) {
      throw new Error("The first argument to server.respond must be a Request object. See https://github.com/sveltejs/kit/pull/3384 for details");
    }
    if (!this.options.hooks) {
      const module2 = await Promise.resolve().then(() => (init_hooks_1c45ba0b(), hooks_1c45ba0b_exports));
      this.options.hooks = {
        getSession: module2.getSession || (() => ({})),
        handle: module2.handle || (({ event, resolve: resolve2 }) => resolve2(event)),
        handleError: module2.handleError || (({ error: error2 }) => console.error(error2.stack)),
        externalFetch: module2.externalFetch || fetch
      };
    }
    return respond(request, this.options, options);
  }
};

// .svelte-kit/vercel-tmp/manifest.js
var manifest = {
  appDir: "_app",
  assets: /* @__PURE__ */ new Set(["favicon.png", "fonts/Lora-Italic.ttf", "fonts/Lora.ttf", "syntaxHighlighting.css"]),
  mimeTypes: { ".png": "image/png", ".ttf": "font/ttf", ".css": "text/css" },
  _: {
    entry: { "file": "start-f82bed3f.js", "js": ["start-f82bed3f.js", "chunks/index-a4305d86.js"], "css": [] },
    nodes: [
      () => Promise.resolve().then(() => (init__(), __exports)),
      () => Promise.resolve().then(() => (init__2(), __exports2)),
      () => Promise.resolve().then(() => (init__3(), __exports3))
    ],
    routes: [
      {
        type: "endpoint",
        id: "rss",
        pattern: /^\/rss\/?$/,
        names: [],
        types: [],
        load: () => Promise.resolve().then(() => (init_rss_ts(), rss_ts_exports))
      },
      {
        type: "page",
        id: "2019/01/21/[slug]",
        pattern: /^\/2019\/01\/21\/([^/]+?)\/?$/,
        names: ["slug"],
        types: [null],
        path: null,
        shadow: null,
        a: [0, 2],
        b: [1]
      }
    ],
    matchers: async () => {
      return {};
    }
  }
};

// .svelte-kit/vercel-tmp/entry.js
var server = new Server(manifest);
var entry_default = async (req, res) => {
  let request;
  try {
    request = await getRequest(`https://${req.headers.host}`, req);
  } catch (err) {
    res.statusCode = err.status || 400;
    return res.end(err.reason || "Invalid request body");
  }
  setResponse(res, await server.respond(request, {
    getClientAddress() {
      return request.headers.get("x-forwarded-for");
    }
  }));
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
/*! fetch-blob. MIT License. Jimmy Wärting <https://jimmy.warting.se/opensource> */
/*! formdata-polyfill. MIT License. Jimmy Wärting <https://jimmy.warting.se/opensource> */
