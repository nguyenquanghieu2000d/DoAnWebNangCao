using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace WebAPIEntity.Controllers
{
    public class TimeController : ApiController
    {
        public string MyFilePath;
        public JObject data;

        TimeController()
        {
            this.MyFilePath = @"C:\hieu\DoAnWebNangCao\WebAPIEntity\WebAPIEntity\Controllers\dvhcvn.json";
            this.data = JObject.Parse(File.ReadAllText(this.MyFilePath));

        }


        [Route("GetJSONData")]
        public IHttpActionResult GetJSONData()
        {
           
  
            return Ok(this.data);
        }
    }
}
