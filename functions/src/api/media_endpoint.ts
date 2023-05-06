class MediaEndpoint {
  private static baseURL = "https://graph.facebook.com/v16.0/";

  private getAccessToken() {
    const accessToken = process.env.ACCESS_TOKEN;
    if (accessToken === undefined) {
      throw Error(
        "ACCESS_TOKEN was not able to be retrived from .env in getAccessToken @ MediaEndpoint"
      );
    }
    return `Bearer ${accessToken}`;
  }

  private async fetchData(url: string): Promise<Result<Response, Error>> {
    const options = {
      method: "GET",
      headers: { Authorization: this.getAccessToken() },
    };

    return await fetch(url, options).then(async (fetchResponse) => {
      if (fetchResponse.status !== 200) {
        return {
          ok: false,
          error: Error(
            `Fetching url ${url} resulted on statusCode: ${fetchResponse.status}`
          ),
        };
      }

      return { ok: true, value: fetchResponse };
    });
  }

  public async getFileFromMediaID(mediaID: string) {
    const response = await this.fetchData(MediaEndpoint.baseURL + mediaID);
    if (!response.ok) {
      return {
        ok: false,
        error: response.error,
      };
    }

    const responseBody = await response.value.json();
    const url = responseBody["url"];

    if (!url) {
      return { ok: false, error: Error("response.value['url'] undefined") };
    }

    const fileResponse = await this.fetchData(url);

    if (!fileResponse.ok) {
      return fileResponse;
    }

    const fileResponseData = fileResponse.value.body;

    return { ok: true, value: fileResponseData };
  }
}
