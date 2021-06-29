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
    public class hinh_anh_mo_taController : ApiController
    {
        private quanlybanhangEntities db = new quanlybanhangEntities();

        // GET: api/hinh_anh_mo_ta
        public IQueryable<hinh_anh_mo_ta> Gethinh_anh_mo_ta()
        {
            return db.hinh_anh_mo_ta;
        }

        // GET: api/hinh_anh_mo_ta/5
        [ResponseType(typeof(hinh_anh_mo_ta))]
        public IHttpActionResult Gethinh_anh_mo_ta(string ma_hang)
        {
            //hinh_anh_mo_ta hinh_anh_mo_ta = db.hinh_anh_mo_ta.Find(id);
            var hinh_anh_mo_ta = (from s in db.hinh_anh_mo_ta
                     where s.ma_hang == ma_hang
                     select new
                     {
                         hinh_dai_dien = s.hinh_dai_dien
                     }).ToList();


            if (hinh_anh_mo_ta == null)
            {
                return NotFound();
            }

            return Ok(hinh_anh_mo_ta);
        }

        // PUT: api/hinh_anh_mo_ta/5
        [ResponseType(typeof(void))]
        public IHttpActionResult Puthinh_anh_mo_ta(string id, hinh_anh_mo_ta hinh_anh_mo_ta)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != hinh_anh_mo_ta.ma_danh_sach_anh)
            {
                return BadRequest();
            }

            db.Entry(hinh_anh_mo_ta).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!hinh_anh_mo_taExists(id))
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

        // POST: api/hinh_anh_mo_ta
        [ResponseType(typeof(hinh_anh_mo_ta))]
        public IHttpActionResult Posthinh_anh_mo_ta(hinh_anh_mo_ta hinh_anh_mo_ta)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.hinh_anh_mo_ta.Add(hinh_anh_mo_ta);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (hinh_anh_mo_taExists(hinh_anh_mo_ta.ma_danh_sach_anh))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = hinh_anh_mo_ta.ma_danh_sach_anh }, hinh_anh_mo_ta);
        }

        // DELETE: api/hinh_anh_mo_ta/5
        [ResponseType(typeof(hinh_anh_mo_ta))]
        public IHttpActionResult Deletehinh_anh_mo_ta(string id)
        {
            hinh_anh_mo_ta hinh_anh_mo_ta = db.hinh_anh_mo_ta.Find(id);
            if (hinh_anh_mo_ta == null)
            {
                return NotFound();
            }

            db.hinh_anh_mo_ta.Remove(hinh_anh_mo_ta);
            db.SaveChanges();

            return Ok(hinh_anh_mo_ta);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool hinh_anh_mo_taExists(string id)
        {
            return db.hinh_anh_mo_ta.Count(e => e.ma_danh_sach_anh == id) > 0;
        }
    }
}