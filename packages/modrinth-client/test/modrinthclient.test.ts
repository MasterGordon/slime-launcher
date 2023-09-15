import { test, expect, beforeEach, describe } from "vitest";
import { createModrinthClient } from "../src/create-modrinth-client";
import type { ModrinthClient } from "../src/create-modrinth-client";
import fs from "fs-extra";
import axios from "axios";
import { finished } from "stream";

const createProjectId = "LNytGWDc";
const botaniaProjectId = "pfjLUfGv";

const createVersion = "5qZVd4uA";
const botaniaVersion = "mwSLII0N";

describe("ModrinthClient", () => {
  let client: ModrinthClient;

  beforeEach(() => {
    client = createModrinthClient({
      userAgent: "test-client",
    });
  });

  test("search", async () => {
    const res = await client.search({
      query: "create",
    });
    expect(res).toBeTypeOf("object");
  });

  test("getTags", async () => {
    const tagTypes = Object.keys(
      client.tags,
    ) as (keyof (typeof client)["tags"])[];
    const tags = await Promise.all(tagTypes.map((t) => client.tags[t]()));
    tags.forEach((tag) => expect(tag.length).gt(0));
  });

  test("getProject", async () => {
    const res = await client.getProject(createProjectId);
    expect(res.title).toContain("Create");
  });

  test("getProjects", async () => {
    const res = await client.getProjects([createProjectId, botaniaProjectId]);
    expect(res[0].title).toContain("Create");
    expect(res[1].title).toContain("Botania");
  });

  test("getProjectVersions", async () => {
    const res = await client.getProjectVersions(createProjectId);
    expect(res.length).gt(0);
  });

  test("getVersion", async () => {
    const res = await client.getVersion(createVersion);
    expect(res.files.length).gt(0);
  });

  test("getVersions", async () => {
    const res = await client.getVersions([createVersion, botaniaVersion]);
    expect(res.length).gt(0);
  });

  test("getVersionFromHash", async () => {
    const tempDir = await fs.mkdtemp("modrinth-test");

    const res = await client.getVersion(createVersion);
    const fileUrl = res.files[0].url;
    const writer = fs.createWriteStream(tempDir + "/create.jar");
    const stream = await axios.get(fileUrl, { responseType: "stream" });
    stream.data.pipe(writer);
    await new Promise<void>((res) => finished(writer, () => res()));

    const hashRes = await client.getVersionFromHashes(tempDir + "/create.jar");
    expect(res).toEqual(hashRes);

    await fs.emptyDir(tempDir);
    await fs.rmdir(tempDir);
  });
});
