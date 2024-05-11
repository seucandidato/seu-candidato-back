export const fakeAuthService = {
  signIn: () =>
    Promise.resolve({
      status: 200,
      statusText: 'OK',
      headers: {
        date: 'Fri, 09 Sep 2022 13:51:30 GMT',
        'x-powered-by': 'Servlet/3.1',
        'x-frame-options': 'SAMEORIGIN',
        'x-content-type-options': 'nosniff',
        pragma: 'no-cache',
        'cache-control': 'no-store',
        'accept-ranges': 'bytes',
        vary: 'Accept-Charset,Accept-Encoding,Accept-Language,Accept',
        'content-type': 'application/json',
        'content-language': 'en-US',
        'set-cookie': [
          'UqZBpD3n3iPIDwJU9CadiUiuctUl0ahqXebsj7W4mDPNGV79P8Ts2n2vtR21VAsT=v1l2k-Je+CkAs; Expires=Fri, 09-Sep-2022 14:21:30 GMT; Path=/',
        ],
        'x-cache': 'MISS from dxl0squid001',
        'x-cache-lookup': 'MISS from dxl0squid001:4001',
        'transfer-encoding': 'chunked',
        via: '1.1 dxl0squid001 (squid/3.5.20)',
        connection: 'close',
      },
      config: {
        headers: {
          Accept: 'application/json, text/plain, /',
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization:
            'Basic cHV4LXBvcnRhbC13ZWItb2F1dGg6QFB1eGVzdGF0aWNvMTIz',
          'User-Agent': 'axios/0.26.0',
          'Content-Length': 134,
          host: 'loginweb.bb.com.br:443',
        },
      },
      data: {
        token_type: 'Bearer',
        scope: 'User.Read profile openid email',
        expires_in: 899,
        ext_expires_in: 899,
        access_token:
          'eyJ0eXAiOiJKV1QiLCJub25jZSI6IlVTeENHaHcydEZkUXVzWG96ZWxXVVhGWDVzZ3QtUjVnZ2NYdHhTOUIzMFUiLCJhbGciOiJSUzI1NiIsIng1dCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyIsImtpZCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyJ9.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTAwMDAtYzAwMC0wMDAwMDAwMDAwMDAiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC85OTk5N2M5ZC0zNzdhLTRmZmMtYjFlMS01NjY1M2ZlYjViZGIvIiwiaWF0IjoxNjkwNTYzNzE5LCJuYmYiOjE2OTA1NjM3MTksImV4cCI6MTY5MDU2NDkxOSwiYWNjdCI6MCwiYWNyIjoiMSIsImFjcnMiOlsidXJuOnVzZXI6cmVnaXN0ZXJzZWN1cml0eWluZm8iXSwiYWlvIjoiQVRRQXkvOFRBQUFBK2lycDNzamlEdnI5ak9adEhtMEdmVTVFMnhMSWZ6V21oWTJDSVp5c1RVeWhsaGhLL3VIQTZFam5hVkNvL3hMbiIsImFtciI6WyJwd2QiXSwiYXBwX2Rpc3BsYXluYW1lIjoiSE0gLSBQb3J0YWwgZGUgVVggLSBHZWNhcDgiLCJhcHBpZCI6IjQ4OTJlMDRhLWRmMTYtNGQxMS04OWI4LWQ1NTliNGRhYzg5YiIsImFwcGlkYWNyIjoiMSIsImZhbWlseV9uYW1lIjoiVGVpeGVpcmEgUmliZWlybyIsImdpdmVuX25hbWUiOiJHaWxzb24iLCJpZHR5cCI6InVzZXIiLCJpbl9jb3JwIjoidHJ1ZSIsImlwYWRkciI6IjE3MC42Ni4xMTAuMSIsIm5hbWUiOiJHaWxzb24gVGVpeGVpcmEgUmliZWlybyIsIm9pZCI6IjYwZDVhM2JjLTQyZjMtNDhiNS1hMDZiLTdlZDI1ZWM3ODFlOCIsIm9ucHJlbV9zaWQiOiJTLTEtNS0yMS05NzgxMDg1OTUtMzAxNTYwNjU0Mi0xNDMyODk1MDE1LTExMzY0MiIsInBsYXRmIjoiNSIsInB1aWQiOiIxMDAzMjAwMkNBOTFDRjA2IiwicmgiOiIwLkFTVUFuWHlabVhvM19FLXg0VlpsUC10YjJ3TUFBQUFBQUFBQXdBQUFBQUFBQUFBbEFGYy4iLCJzY3AiOiJVc2VyLlJlYWQgcHJvZmlsZSBvcGVuaWQgZW1haWwiLCJzaWduaW5fc3RhdGUiOlsiaW5rbm93bm50d2siXSwic3ViIjoiME9aLWEtMnVjUjd5WmUyMkJSM1lvRHdONTk4d1NEaGE1cXVGZGdPbWdaMCIsInRlbmFudF9yZWdpb25fc2NvcGUiOiJTQSIsInRpZCI6Ijk5OTk3YzlkLTM3N2EtNGZmYy1iMWUxLTU2NjUzZmViNWJkYiIsInVuaXF1ZV9uYW1lIjoiQzEyOTc4MjhAYmFuY29icmFzaWwuY29tLmJyIiwidXBuIjoiQzEyOTc4MjhAYmFuY29icmFzaWwuY29tLmJyIiwidXRpIjoiSjY4UmZJbVFKa3llMzBkZVV1QWVBQSIsInZlciI6IjEuMCIsIndpZHMiOlsiYjc5ZmJmNGQtM2VmOS00Njg5LTgxNDMtNzZiMTk0ZTg1NTA5Il0sInhtc19zdCI6eyJzdWIiOiJ3QmVBYzJYQXJXZjJqbU13ZmU0NXdQeDB1T3ZnRy1xUkIyV2pNaGtWbFE4In0sInhtc190Y2R0IjoxNDc5NDg4NTcyfQ.JDLIfB5GeKQyqJGToAfsakUJpZKYGazdyXd4EqmDDpHKwTphYDZuoUm21qNv6muzzNHIyklmxxFPYxf_hckP7cMuoE7Mc2DwiyWUb3uwt0OiIzfjtlp0aSwY0uKr1HTCJ8GQ2ISVlXezxjbH3wI1_EQ_t1gzllhEKKAFciTZFu25MSfslFDZ1CLhDTi3zuPn-6rsd6aco6RfWcMkYJBqqNCpLa8SlmW-Qzqlkt1kXLv4itcBSLdy5KAPXcIGD6bZpEwZiqe4o6zMYvXlqqCohi7L9SiXFyUEbIpAdfPNK4eHPnvBH8IXWPTyroNKMIEKPH0EAtS-Hm_qHs6KVVtE9A',
        refresh_token:
          '0.ASUAnXyZmXo3_E-x4VZlP-tb20rgkkgW3xFNibjVWbTayJslAFc.AgABAAEAAAD--DLA3VO7QrddgJg7WevrAgDs_wUA9P8gux0enrX6a8a4Hr6CTEonJPaoeuaiHInWCJRld7iWOMkFKTgZBWvcwr6dbWdxlCAiHDbnpPgb9L-XplhV30fAM4wQXgSSb5NPiyUrrmaGBwAk53XNR4xAwoko7Ltgotp6C2IoWtStN2E-WZ1uwKROgaxiBFaHJVbhvFWFFjpZmcusgff92_xEI8ePnghwPF-bDdxtmHKIRUbdEe3Q-InkiZv7GUH83Sj0p0Pa5PaxE1k_zBRNZDSfLwsXn_uyTo3yH60uR84z_uu6ZI3JA75GAPRme57DI_brbsnSYqacbKjfl8jXaxwicLKW8_vxG7rinTbjF-IpMF5v46ob5QsKGWJATI37W6m9_Mud_Y2SxfADgvqimWcB0kYoaXZYowvdUcGT7349Y48l6dPNibgdpQXS9YYE6rVuRv8diXEepKHxiZ3dREgJw8ES2t7aiyIOwKyxh0qwdncghv0bALGdXg57X3WDxhhVkJwFNkCMyK-GX6fTXUMUM51b3ggSeJc2pcnAm_2wDEjNXWpzgekd-EiBUMKzw4eChfhJOl-Mui3mUcwmMqb2xO8yPYczYyXxp6WytgFKEy7VTDHGSkxbAKFHB7vIAaMFD_ZepIox7Yb99XVhQr1xhDhH1v8g75dkPNnjM6Wg2oZWt2ucLPl79rdlmgBTFXln_sAsysVh23DPUq37immM7pv1xHJNcn0nHnZ5uexVqMHI5MJH-FWrNmGJ9dGdzTOQ6OBTr1xSYutj_4_fAyOrTbaKMgpaZo_IDkvcyHqrpGJ7oq0gaKoXHlHYZcK2ohCnYX_QY-Aq55sU16XFK1fIJDHnRNKQ',
        id_token:
          'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyJ9.eyJhdWQiOiI0ODkyZTA0YS1kZjE2LTRkMTEtODliOC1kNTU5YjRkYWM4OWIiLCJpc3MiOiJodHRwczovL2xvZ2luLm1pY3Jvc29mdG9ubGluZS5jb20vOTk5OTdjOWQtMzc3YS00ZmZjLWIxZTEtNTY2NTNmZWI1YmRiL3YyLjAiLCJpYXQiOjE2OTA1NjM3MTksIm5iZiI6MTY5MDU2MzcxOSwiZXhwIjoxNjkwNTY0OTE5LCJyaCI6IjAuQVNVQW5YeVptWG8zX0UteDRWWmxQLXRiMjByZ2trZ1czeEZOaWJqVldiVGF5SnNsQUZjLiIsInN1YiI6IndCZUFjMlhBcldmMmptTXdmZTQ1d1B4MHVPdmdHLXFSQjJXak1oa1ZsUTgiLCJ0aWQiOiI5OTk5N2M5ZC0zNzdhLTRmZmMtYjFlMS01NjY1M2ZlYjViZGIiLCJ1dGkiOiJKNjhSZkltUUpreWUzMGRlVXVBZUFBIiwidmVyIjoiMi4wIiwiTWF0cmljdWxhIEJCIjoiQzEyOTc4MjgiLCJVT1IiOiJVT1IgICA1MTQ0MjMtRElURUMvR0VDQVA4L0cxL0UyIn0.cB00xEP0fi-KfpZ8fXK83eRENrxj797-OorrQC9oofaCZ_rc8bJURjn39ElXR8V8AfKkuh1-1RCuj2rSnhaXhuSNBECG2Y7LJWfU09FAjl7HYh2x1yoGVoHvtMvaVcTudElUCGQwMsPbzqJBnfeqig84Qy9BvESLHCiW10YSBBwj90zX8A0Sieb7s-_JG5bq4TEH5qZJLxFPaBdD2eSZneWeMUcAWwEWV1SKYubG42JH8ZfxWTq6MWPr343r3Pl-0wsbP58J9lU89jJ5CvTWXPi_knGMQDSVsCtAEffKNRQRBSawY7kUurdGjIykmJecIEMREMMnrgo9r8chYICXBA',
      },
    }),
  userInfo: (headers: any) => {
    if (headers.authorization === 'Bearer test') {
      return Promise.resolve({
        sub: 1,
        username: 'clarckkent',
        iat: 1715022887,
        exp: 1715022947,
      });
    } else if (headers.authorization === 'Bearer test2') {
      return Promise.resolve({
        sub: 2,
        username: 'clarckkentt',
        iat: 1715022887,
        exp: 1715022947,
      });
    }

    return Promise.resolve({
      status: 403,
    });
  },
};
