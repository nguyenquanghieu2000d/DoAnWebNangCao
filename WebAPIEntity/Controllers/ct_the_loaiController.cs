using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using WebAPIEntity;

namespace WebAPIEntity.Controllers
{
    public class ct_the_loaiController : ApiController
    {
        private quanlybanhangEntities db = new quanlybanhangEntities();

        // GET: api/ct_the_loai
        public IQueryable<ct_the_loai> Getct_the_loai()
        {
            return db.ct_the_loai;  
        }


        [Route("CountCTTheLoai")]

        public IHttpActionResult PostCountCTTheLoai(ct_the_loai ct_the_loai)
        {
            var x = (from s in db.ct_the_loai
                     where s.ma_the_loai.Contains(ct_the_loai.ma_the_loai) &&
                          s.ten_ct_the_loai.Contains(ct_the_loai.ten_ct_the_loai) &&
                          s.ma_loai.Contains(ct_the_loai.ma_loai)
                     select new
                     {
                         ma_the_loai = s.ma_the_loai
                     }).ToList();
            return Ok(new { so_luong = x.Count });
        }


        [Route("getCTTheLoaiPaging")]
        public IHttpActionResult PostCTTheLoaiPhanTrang(int numget, int skip, ct_the_loai ct_the_loai)
        {
            //return Ok(hang);
            return Ok((from s in db.ct_the_loai
                       where s.ma_the_loai.Contains(ct_the_loai.ma_the_loai)
                       && s.ma_loai.Contains(ct_the_loai.ma_loai)
                       && s.ten_ct_the_loai.Contains(ct_the_loai.ten_ct_the_loai)
                       select new
                       {
                           ma_the_loai = s.ma_the_loai,
                           ten_ct_the_loai = s.ten_ct_the_loai,
                           ma_loai = s.ma_loai
                       }).OrderBy(p => p.ma_loai).ToList().Skip(skip).Take(numget));

        }


        [Route("GetCTTheLoaiByID_ma_loai")]
        [ResponseType(typeof(theloai))]
        public IHttpActionResult GetCTTheLoaiCT_(string ma_loai)
        {
            var theloai = (from s in db.ct_the_loai
                           where s.ma_loai == ma_loai
                           select new
                           {
                               ma_loai = s.ma_loai,
                               ma_the_loai = s.ma_the_loai,
                               ten_ct_the_loai = s.ten_ct_the_loai
                           }).ToList();
            if (theloai == null)
            {
                return NotFound();
            }

            return Ok(theloai);
        }


        [Route("GetCTTheLoaiByID")]
        [ResponseType(typeof(theloai))]
        public IHttpActionResult GetCTTheLoaiCT(string ma_the_loai)
        {
            var theloai = (from s in db.ct_the_loai
                           where s.ma_the_loai == ma_the_loai
                           select new
                           {
                               ma_loai = s.ma_loai,
                               ma_the_loai = s.ma_the_loai,
                               ten_ct_the_loai = s.ten_ct_the_loai
                           }).ToList();
            if (theloai == null)
            {
                return NotFound();
            }

            return Ok(theloai);
        }

        // GET: api/ct_the_loai/5
        [ResponseType(typeof(ct_the_loai))]
        public IHttpActionResult Getct_the_loai(string id)
        {
            ct_the_loai ct_the_loai = db.ct_the_loai.Find(id);
            if (ct_the_loai == null)
            {
                return NotFound();
            }

            return Ok(ct_the_loai);
        }

        [Route("Putcttheloai")]
        [ResponseType(typeof(void))]
        public IHttpActionResult Puttheloai(ct_the_loai theloai)
        {
            //return Ok(theloai);
            var x = (from s in db.ct_the_loai 
                     where s.ma_loai == theloai.ma_loai select s).SingleOrDefault();
            x.ma_loai = theloai.ma_loai;
            x.ten_ct_the_loai = theloai.ten_ct_the_loai;
            x.ma_the_loai = theloai.ma_the_loai;
            db.SaveChanges();
            return StatusCode(HttpStatusCode.NoContent);
        }

        // PUT: api/ct_the_loai/5
        [ResponseType(typeof(void))]
        public IHttpActionResult Putct_the_loai(string id, ct_the_loai ct_the_loai)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != ct_the_loai.ma_loai)
            {
                return BadRequest();
            }

            db.Entry(ct_the_loai).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ct_the_loaiExists(id))
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

       [Route("PostCTTheLoai")]
        public IHttpActionResult Posttheloai_(ct_the_loai ct_the_loai)
        {
            ct_the_loai.ma_loai = db.p_ct_the_loai().FirstOrDefault();
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            db.ct_the_loai.Add(ct_the_loai);
            db.SaveChanges();
            return Ok(new { id = 1 });
        }



        [ResponseType(typeof(ct_the_loai))]
        public IHttpActionResult Postct_the_loai(ct_the_loai ct_the_loai)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.ct_the_loai.Add(ct_the_loai);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (ct_the_loaiExists(ct_the_loai.ma_loai))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = ct_the_loai.ma_loai }, ct_the_loai);
        }

        // DELETE: api/ct_the_loai/5
        [Route("DeleteCTTheLoai")]
        [ResponseType(typeof(ct_the_loai))]
        public IHttpActionResult Postdelct_the_loai(ct_the_loai ct)
        {
            ct_the_loai ct_the_loai = db.ct_the_loai.Find(ct.ma_loai);
            if (ct_the_loai == null)
            {
                return NotFound();
            }

            db.ct_the_loai.Remove(ct_the_loai);
            db.SaveChanges();

            return Ok(ct_the_loai);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ct_the_loaiExists(string id)
        {
            return db.ct_the_loai.Count(e => e.ma_loai == id) > 0;
        }
    }
}