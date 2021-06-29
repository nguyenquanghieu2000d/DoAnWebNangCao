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
    public class theloaisController : ApiController
    {
        private quanlybanhangEntities db = new quanlybanhangEntities();

        // GET: api/theloais
        public IHttpActionResult Gettheloais()
        {
        
            return 
                Ok((from s in db.theloais 
                 select new 
                 {
                    ma_the_loai = s.ma_the_loai,
                    ten_loai = s.ten_loai
                }).ToList());
        
        
        }

        [Route("CountTheLoai")]

        public IHttpActionResult PostCountTheLoai(theloai theloai)
        {
            var x = (from s in db.theloais
                     where s.ma_the_loai.Contains(theloai.ma_the_loai) &&
                          s.ten_loai.Contains(theloai.ten_loai)
                     select new
                     {
                         ma_the_loai = s.ma_the_loai
                     }).ToList();
            return Ok(new { so_luong = x.Count });
        }


        [Route("getTheLoaiPaging")]
        public IHttpActionResult PostHangPhanTrang(int numget, int skip, theloai theloai)
        {
            //return Ok(hang);
            return Ok((from s in db.theloais
                       where s.ma_the_loai.Contains(theloai.ma_the_loai)
                       && s.ten_loai.Contains(theloai.ten_loai)
                       select new
                       {
                           ma_the_loai = s.ma_the_loai,
                           ten_loai = s.ten_loai
                       }).OrderBy(p => p.ma_the_loai).ToList().Skip(skip).Take(numget));

        }



        // GET: api/theloais/5
        [Route("GetTheLoaiByID")]
        [ResponseType(typeof(theloai))]
        public IHttpActionResult Gettheloai(string ma_the_loai)
        {
            var theloai = (from s in db.theloais
                           where s.ma_the_loai == ma_the_loai
                           select new
                           {
                               ma_the_loai = s.ma_the_loai,
                               ten_loai = s.ten_loai
                           }).ToList();
            if (theloai == null)
            {
                return NotFound();
            }

            return Ok(theloai);
        }


        [Route("Posttheloai")]
        //[ResponseType(typeof(hang))]
        public IHttpActionResult Posttheloai_(theloai theloai)
        {
            theloai.ma_the_loai = db.p_theloai().FirstOrDefault();

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            db.theloais.Add(theloai);
            db.SaveChanges();
            return Ok(new { id = theloai.ten_loai });
        }



        [Route("Puttheloai")]
        [ResponseType(typeof(void))]

        public IHttpActionResult Puttheloai(theloai theloai)
        {
            var x = (from s in db.theloais where s.ma_the_loai == theloai.ma_the_loai select s).SingleOrDefault();
            x.ten_loai = theloai.ten_loai;
            db.SaveChanges();
            return StatusCode(HttpStatusCode.NoContent);
        }


        // PUT: api/theloais/5
        [ResponseType(typeof(void))]
        public IHttpActionResult Puttheloai(string id, theloai theloai)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != theloai.ma_the_loai)
            {
                return BadRequest();
            }

            db.Entry(theloai).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!theloaiExists(id))
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

        // POST: api/theloais
        [ResponseType(typeof(theloai))]
        public IHttpActionResult Posttheloai(theloai theloai)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.theloais.Add(theloai);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (theloaiExists(theloai.ma_the_loai))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = theloai.ma_the_loai }, theloai);
        }

        // DELETE: api/theloais/5
        [Route("DeleteTheLoai")]
        [ResponseType(typeof(theloai))]
        public IHttpActionResult Posttheloai(string ma_the_loai)
        {
            theloai theloai = db.theloais.Find(ma_the_loai);
            if (theloai == null)
            {
                return NotFound();
            }

            db.theloais.Remove(theloai);
            db.SaveChanges();

            return Ok(theloai);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool theloaiExists(string id)
        {
            return db.theloais.Count(e => e.ma_the_loai == id) > 0;
        }
    }
}