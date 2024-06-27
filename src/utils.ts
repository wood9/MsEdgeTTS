import { Buffer } from "buffer";

function getHeadersAndData(data, headerLength):[any, Buffer] {
  if (!Buffer.isBuffer(data)) {
    throw new TypeError("data must be a Buffer");
  }

  const headers = {};
  const headerData = data.subarray(0, headerLength).toString();

  headerData.split("\r\n").forEach((line) => {
    const [key, value] = line.split(":", 2);
    headers[key] = value.trim();
  });

  return [headers, data.subarray(headerLength + 2)];
}

function parseMetadata(data, offset_compensation = 0) {
  // 将字节数据转换为JSON对象
  const jsonData = JSON.parse(data.toString());

  // 遍历元数据数组
  for (const metaObj of jsonData["Metadata"]) {
    const metaType = metaObj["Type"];

    // 如果元数据类型为 "WordBoundary"
    if (metaType === "WordBoundary") {
      const currentOffset =
        metaObj["Data"]["Offset"] + offset_compensation;
      const currentDuration = metaObj["Data"]["Duration"];

      // 返回解析后的元数据对象
      return {
        type: metaType,
        offset: currentOffset,
        duration: currentDuration,
        text: metaObj["Data"]["text"]["Text"],
      };
    }

    // 如果元数据类型为 "SessionEnd"，则继续遍历
    if (metaType === "SessionEnd") {
      continue;
    }

    // 如果遇到未知的元数据类型，抛出异常
    throw new Error(`Unknown metadata type: ${metaType}`);
  }

  // 如果没有找到 "WordBoundary" 元数据，抛出异常
  throw new Error("No WordBoundary metadata found");
}

export { getHeadersAndData, parseMetadata };
