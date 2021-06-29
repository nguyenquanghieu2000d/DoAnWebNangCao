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
    public class hangsController : ApiController
    {
        private quanlybanhangEntities db = new quanlybanhangEntities();

        // GET: api/hangs

        [Route("get")]
        public IHttpActionResult okok()
        {
            return Ok((from s in db.hangs select new
            {
                ma_hang = s.ma_hang
            }).ToList());
        }


        [Route("getHangNoPaging")]
        public IHttpActionResult PostHangKoPhanTrang(hang hang)
        {
            if(hang != null)
            //return Ok(hang);
                return Ok((from s in db.hangs
                           where s.ma_hang.Contains(hang.ma_hang)
                           && s.ten_hang.Contains(hang.ten_hang)
                           && s.gia_moi >= hang.gia_moi
                           && s.gia_moi <= hang.gia_cu
                           && s.thuong_hieu.Contains(hang.thuong_hieu)
                           && s.ma_loai.Contains(hang.ma_loai)
                           select new
                           {
                               ma_hang = s.ma_hang,
                               ten_hang = s.ten_hang,
                               gia_cu = s.gia_cu,
                               gia_moi = s.gia_moi,
                               thuong_hieu = s.thuong_hieu,
                               hinh_dai_dien = s.hinh_dai_dien,
                               trang_thai = s.trang_thai,
                               mo_ta = s.mo_ta,
                               ma_loai = s.ma_loai
                           }).OrderBy(p => p.ma_hang).ToList());
            else
            {
                return Ok((from s in db.hangs
                           select new
                           {
                               ma_hang = s.ma_hang,
                               ten_hang = s.ten_hang,
                               gia_cu = s.gia_cu,
                               gia_moi = s.gia_moi,
                               thuong_hieu = s.thuong_hieu,
                               hinh_dai_dien = s.hinh_dai_dien,
                               trang_thai = s.trang_thai,
                               mo_ta = s.mo_ta,
                               ma_loai = s.ma_loai
                           }).OrderBy(p => p.ma_hang).ToList());
            }

        }

        [Route("getHangByCategory")]
        public IHttpActionResult Gethangss(string category)
        {
            var x = (from s in db.hangs
                     where s.ct_the_loai.ma_loai.Contains(category)
                     select new
                     {
                         ma_hang = s.ma_hang,
                         ten_hang = s.ten_hang,
                         gia_cu = s.gia_cu,
                         gia_moi = s.gia_moi,
                         thuong_hieu = s.thuong_hieu,
                         hinh_dai_dien = s.hinh_dai_dien,
                         mo_ta = s.mo_ta,
                         trang_thai = s.trang_thai
                     }).ToList();

            return Ok(x);
        }



        [Route("getHangPaging")]
        public IHttpActionResult PostHangPhanTrang(int numget, int skip, string category, string subcategory, int order, hang hang)
        {

            //var truyvan = (Object)null;
            if (hang == null)
            {
                
                if (order == 0)
                {
                    return Ok((from s in db.hangs
                             select new
                             {
                                 ma_hang = s.ma_hang,
                                 ten_hang = s.ten_hang,
                                 gia_cu = s.gia_cu,
                                 gia_moi = s.gia_moi,
                                 thuong_hieu = s.thuong_hieu,
                                 hinh_dai_dien = s.hinh_dai_dien,
                                 trang_thai = s.trang_thai,
                                 mo_ta = s.mo_ta,
                                 ma_loai = s.ma_loai
                             }).OrderBy(p => p.ma_hang).ToList().Skip(skip).Take(numget));
                }
                else if(order == 1)
                {
                    return Ok((from s in db.hangs
                               select new
                               {
                                   ma_hang = s.ma_hang,
                                   ten_hang = s.ten_hang,
                                   gia_cu = s.gia_cu,
                                   gia_moi = s.gia_moi,
                                   thuong_hieu = s.thuong_hieu,
                                   hinh_dai_dien = s.hinh_dai_dien,
                                   trang_thai = s.trang_thai,
                                   mo_ta = s.mo_ta,
                                   ma_loai = s.ma_loai
                               }).OrderBy(p => p.gia_moi).ToList().Skip(skip).Take(numget));
                }
                else
                {
                    return Ok((from s in db.hangs
                               select new
                               {
                                   ma_hang = s.ma_hang,
                                   ten_hang = s.ten_hang,
                                   gia_cu = s.gia_cu,
                                   gia_moi = s.gia_moi,
                                   thuong_hieu = s.thuong_hieu,
                                   hinh_dai_dien = s.hinh_dai_dien,
                                   trang_thai = s.trang_thai,
                                   mo_ta = s.mo_ta,
                                   ma_loai = s.ma_loai
                               }).OrderByDescending(p => p.gia_moi).ToList().Skip(skip).Take(numget));
                }
            }
            else
            {
                if (order == 0)
                {
                    return Ok((from s in db.hangs
                               where

                               s.ma_hang.Contains(hang.ma_hang)
                               && s.ten_hang.Contains(hang.ten_hang)
                               && s.gia_moi >= hang.gia_moi
                               && s.gia_moi <= hang.gia_cu
                               && s.thuong_hieu.Contains(hang.thuong_hieu)
                               && s.ct_the_loai.ma_loai.Contains(subcategory)
                               && s.ct_the_loai.ma_the_loai.Contains(category)
                               select new
                               {
                                   ma_hang = s.ma_hang,
                                   ten_hang = s.ten_hang,
                                   gia_cu = s.gia_cu,
                                   gia_moi = s.gia_moi,
                                   thuong_hieu = s.thuong_hieu,
                                   hinh_dai_dien = s.hinh_dai_dien,
                                   trang_thai = s.trang_thai,
                                   mo_ta = s.mo_ta,
                                   ma_loai = s.ma_loai
                               }).OrderBy(p => p.ma_hang).ToList().Skip(skip).Take(numget));
                }
                else if(order == 1)
                {
                    return Ok((from s in db.hangs
                               where

                               s.ma_hang.Contains(hang.ma_hang)
                               && s.ten_hang.Contains(hang.ten_hang)
                               && s.gia_moi >= hang.gia_moi
                               && s.gia_moi <= hang.gia_cu
                               && s.thuong_hieu.Contains(hang.thuong_hieu)
                               && s.ct_the_loai.ma_loai.Contains(subcategory)
                               && s.ct_the_loai.ma_the_loai.Contains(category)
                               select new
                               {
                                   ma_hang = s.ma_hang,
                                   ten_hang = s.ten_hang,
                                   gia_cu = s.gia_cu,
                                   gia_moi = s.gia_moi,
                                   thuong_hieu = s.thuong_hieu,
                                   hinh_dai_dien = s.hinh_dai_dien,
                                   trang_thai = s.trang_thai,
                                   mo_ta = s.mo_ta,
                                   ma_loai = s.ma_loai
                               }).OrderBy(p => p.gia_moi).ToList().Skip(skip).Take(numget));
                }
                else
                {
                    return Ok((from s in db.hangs
                               where

                               s.ma_hang.Contains(hang.ma_hang)
                               && s.ten_hang.Contains(hang.ten_hang)
                               && s.gia_moi >= hang.gia_moi
                               && s.gia_moi <= hang.gia_cu
                               && s.thuong_hieu.Contains(hang.thuong_hieu)
                               && s.ct_the_loai.ma_loai.Contains(subcategory)
                               && s.ct_the_loai.ma_the_loai.Contains(category)
                               select new
                               {
                                   ma_hang = s.ma_hang,
                                   ten_hang = s.ten_hang,
                                   gia_cu = s.gia_cu,
                                   gia_moi = s.gia_moi,
                                   thuong_hieu = s.thuong_hieu,
                                   hinh_dai_dien = s.hinh_dai_dien,
                                   trang_thai = s.trang_thai,
                                   mo_ta = s.mo_ta,
                                   ma_loai = s.ma_loai
                               }).OrderByDescending(p => p.gia_moi).ToList().Skip(skip).Take(numget));
                }
            }
     
            
        }

        [Route("Counthang")]

        public IHttpActionResult PostCountHang(hang hang) 
        {
            var x = (from s in db.hangs
                     where
                          s.ma_hang.Contains(hang.ma_hang)
                          && s.ten_hang.Contains(hang.ten_hang)
                          && s.gia_moi >= hang.gia_moi
                          && s.gia_moi <= hang.gia_cu
                          && s.thuong_hieu.Contains(hang.thuong_hieu)
                     select new
                     {
                         ma_hang = s.ma_hang
                     }).ToList();
            return Ok(new { so_luong = x.Count });
        }


        [Route("getHangByID_")]
        public IHttpActionResult PosthangByID(string ma_hang)
        {



            var x = (from s in db.hangs
                     where s.ma_hang == ma_hang
                     select new
                     {
                         ma_hang = s.ma_hang,
                         ten_hang = s.ten_hang,
                         gia_cu = s.gia_cu,
                         gia_moi = s.gia_moi,
                         thuong_hieu = s.thuong_hieu,
                         hinh_dai_dien = s.hinh_dai_dien,
                         mo_ta = s.mo_ta,
                         trang_thai = s.trang_thai,
                         ma_loai = s.ma_loai
                     }).ToList();

            return Ok(x);
        }


        [Route("getHangByID")]
        public IHttpActionResult GethangByID(string ma_hang)
        {



            var x = (from s in db.hangs
                     where s.ma_hang == ma_hang
                     select new
                     {
                         ma_hang = s.ma_hang,
                         ten_hang = s.ten_hang,
                         gia_cu = s.gia_cu,
                         gia_moi = s.gia_moi,
                         thuong_hieu = s.thuong_hieu,
                         hinh_dai_dien = s.hinh_dai_dien,
                         mo_ta = s.mo_ta,
                         trang_thai = s.trang_thai
                     }).FirstOrDefault();

            return Ok(x);
        }

        

        // GET: api/hangs/5
        [ResponseType(typeof(hang))]
        public IHttpActionResult Gethang(string id)
        {
            hang hang = db.hangs.Find(id);
            if (hang == null)
            {
                return NotFound();
            }

            return Ok(hang);
        }

        // PUT: api/hangs/5
        [Route("Puthang")]
        [ResponseType(typeof(void))]

        public IHttpActionResult Puthang(hang hang)
        {
            var x = (from s in db.hangs where s.ma_hang == hang.ma_hang select s).SingleOrDefault();
            x.ten_hang = hang.ten_hang;
            x.gia_cu = hang.gia_cu;
            x.gia_moi = hang.gia_moi;
            x.thuong_hieu = hang.thuong_hieu;
            x.hinh_dai_dien = hang.hinh_dai_dien;
            x.mo_ta = hang.mo_ta;
            x.ma_loai = hang.ma_loai;
            db.SaveChanges();
            return StatusCode(HttpStatusCode.NoContent);
        }




        // POST: api/hangs
        [Route("Posthang")]
        [ResponseType(typeof(hang))]
        public IHttpActionResult Posthang(hang hang)
        {
            hang.ma_hang = db.p_hang().FirstOrDefault();
            string a = hang.ma_loai;
            hang.ma_loai = "";

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            db.hangs.Add(hang);
            var aa = db.hangs.Find(hang.ma_hang);
            aa.ma_loai = a;
            db.SaveChanges();
            return Ok(new { id = 1 });
        }

        // DELETE: api/hangs/5
        [ResponseType(typeof(hang))]
        public IHttpActionResult Deletehang(string id)
        {
            hang hang = db.hangs.Find(id);
            if (hang == null)
            {
                return NotFound();
            }

            db.hangs.Remove(hang);
            db.SaveChanges();

            return Ok(hang);
        }

        [Route("DeleteHang")]
        [ResponseType(typeof(hang))]
        public IHttpActionResult Posthang_(hang a)
        {
            hang hang = db.hangs.Find(a.ma_hang);
            if (hang == null)
            {
                return NotFound();
            }

            db.hangs.Remove(hang);
            db.SaveChanges();

            return Ok(hang);
        }


        [Route("test")]
        [ResponseType(typeof(hang))]
        public IHttpActionResult getTest()
        {
            string path = @"C:\Users\nguyenquanghieu\source\repos\WebAPIEntity\WebAPIEntity\Data\Image\1091.jpg";
            Image image = Image.FromFile(path);
            MemoryStream m = new MemoryStream();
            image.Save(m, image.RawFormat);
            byte[] imageBytes = m.ToArray();
            string base64String = Convert.ToBase64String(imageBytes);
            return Ok(base64String);
        }





        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }



        


        private bool hangExists(string id)
        {
            return db.hangs.Count(e => e.ma_hang == id) > 0;
        }
    }
}