using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using WebAPIEntity;

namespace WebAPIEntity.Controllers
{
    public class bannersController : ApiController
    {

        

        private string rootPathImage1 = @"C:\hieu\DoAnWebNangCao\Frontend\public\app\Image";
        private string rootPathImage2 = @"C:\hieu\DoAnWebNangCao\admin\public\app\Image";

        


        private quanlybanhangEntities db = new quanlybanhangEntities();

        // GET: api/banners
        public IQueryable<banner> Getbanners()
        {
            return db.banners;
        }


        [Route("CountBanner")]

        public IHttpActionResult PostCountCTTheLoai(banner banner)
        {
            var x = (from s in db.banners
                     where s.ma_banner.Contains(banner.ma_banner) &&
                          s.ten_banner.Contains(banner.ten_banner) &&
                          s.link.Contains(banner.link) && 
                          s.mo_ta.Contains(banner.mo_ta) &&
                          s.isSlide.Contains(banner.isSlide)
                     select new
                     {
                         ma_banner = s.ma_banner
                     }).ToList();
            return Ok(new { so_luong = x.Count });
        }



        [Route("getBannerPaging")]
        public IHttpActionResult PostCTTheLoaiPhanTrang(int numget, int skip, banner banner)
        {
            var xxx = (from s in db.banners
                     where s.ma_banner.Contains(banner.ma_banner)
                     && s.mo_ta.Contains(banner.mo_ta)       
                     && s.ten_banner.Contains(banner.ten_banner)
                     && s.link.Contains(banner.link)
                     && s.isSlide.Contains(banner.isSlide)
                     select new
                     {
                         ma_banner = s.ma_banner,
                         ten_banner = s.ten_banner,
                         mo_ta = s.mo_ta,
                         link = s.link,
                         image = s.image,
                         isSlide = s.isSlide
                     }).OrderBy(p => p.ma_banner).ToList().Skip(skip).Take(numget);

            //List<banner> result = new List<banner>();
            //foreach(var i in xxx)
            //{
            //    banner a = new banner();
            //    a.ma_banner = i.ma_banner;
            //    a.ten_banner = i.ten_banner;
            //    a.mo_ta = i.mo_ta;
            //    a.link = i.link;
            //    a.image = i.image.Replace(i.image, func(i.image));
            //    result.Add(a);
            //}

            return Ok(xxx);

        }

        [Route("GetBannerByID")]
        [ResponseType(typeof(theloai))]
        public IHttpActionResult GetCTTheLoaiCT(string ma_banner)
        {
            var banner = (from s in db.banners
                           where s.ma_banner == ma_banner
                           select new
                           {
                               ma_banner = s.ma_banner,
                               ten_banner = s.ten_banner,
                               mo_ta = s.mo_ta,
                               link = s.link,
                               image = s.image,
                               isSlide = s.isSlide
                           }).ToList();
            if (banner == null)
            {
                return NotFound();
            }

            return Ok(banner);
        }


        public Image Base64ToImage(string base64String)
        {
            // Convert Base64 String to byte[]
            byte[] imageBytes = Convert.FromBase64String(base64String.Split(',')[1]);
            MemoryStream ms = new MemoryStream(imageBytes, 0, imageBytes.Length);

            // Convert byte[] to Image
            ms.Write(imageBytes, 0, imageBytes.Length);
            Image image = Image.FromStream(ms, true);

            return image;
        }

        [Route("PutBanner")]
        [ResponseType(typeof(void))]
        public IHttpActionResult Puttheloai(banner banner)
        {
            if (banner.image != "")
            {
                Image image = Base64ToImage(banner.image);
                image.Save(Path.Combine(rootPathImage1, "banner", banner.ma_banner + ".jpg"));
                image.Save(Path.Combine(rootPathImage2, "banner", banner.ma_banner + ".jpg"));
            }
                
            
            var x = (from s in db.banners
                     where s.ma_banner == banner.ma_banner
                     select s).SingleOrDefault();
            x.ma_banner = banner.ma_banner;
            x.ten_banner = banner.ten_banner;
            x.mo_ta = banner.mo_ta;
            x.link = banner.link;
            x.isSlide = banner.isSlide;
            db.SaveChanges();
            return StatusCode(HttpStatusCode.NoContent);
        }


        [Route("PostBanner")]
        public IHttpActionResult Posttheloai_(banner banner)
        {
            banner.ma_banner = db.p_banner().FirstOrDefault();

            if (banner.image != "")
            {
                Image image = Base64ToImage(banner.image);
                image.Save(Path.Combine(rootPathImage1, "banner", banner.ma_banner + ".jpg"));
                image.Save(Path.Combine(rootPathImage2, "banner", banner.ma_banner + ".jpg"));
            }
            banner.image = @"Image\banner\" + banner.ma_banner + ".jpg";


            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            db.banners.Add(banner);
            db.SaveChanges();
            return Ok(new { id = 1 });
        }

        [Route("DeleteBanner")]
        [ResponseType(typeof(banner))]
        public IHttpActionResult Postdelct_the_loai(string banner)
        {
            banner banner1 = db.banners.Find(banner);
            if (banner1 == null)
            {
                return NotFound();
            }

            
            db.banners.Remove(banner1);
            db.SaveChanges();

            return Ok("1");
        }



        // GET: api/banners/5
        [ResponseType(typeof(banner))]
        public IHttpActionResult Getbanner(string id)
        {
            banner banner = db.banners.Find(id);
            if (banner == null)
            {
                return NotFound();
            }

            return Ok(banner);
        }

        // PUT: api/banners/5
        [ResponseType(typeof(void))]
        public IHttpActionResult Putbanner(string id, banner banner)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != banner.ma_banner)
            {
                return BadRequest();
            }

            db.Entry(banner).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!bannerExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/banners
        [ResponseType(typeof(banner))]
        public IHttpActionResult Postbanner(banner banner)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.banners.Add(banner);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (bannerExists(banner.ma_banner))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = banner.ma_banner }, banner);
        }

        // DELETE: api/banners/5
        [ResponseType(typeof(banner))]
        public IHttpActionResult Deletebanner(string id)
        {
            banner banner = db.banners.Find(id);
            if (banner == null)
            {
                return NotFound();
            }

            db.banners.Remove(banner);
            db.SaveChanges();

            return Ok(banner);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool bannerExists(string id)
        {
            return db.banners.Count(e => e.ma_banner == id) > 0;
        }
    }
}