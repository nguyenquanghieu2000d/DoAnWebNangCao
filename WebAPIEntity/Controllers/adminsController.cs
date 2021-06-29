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
    public class adminsController : ApiController
    {
        private quanlybanhangEntities db = new quanlybanhangEntities();

        // GET: api/admins
        public IQueryable<admin> Getadmins()
        {
            return db.admins;
        }


        [Route("adminLogin")]
        public string PostAdminLogin(admin admin)
        {
            if (!ModelState.IsValid)
            {
                return "!ModelState.IsValid";
            }
            if ((from s in db.admins where s.username == admin.username && s.password == admin.password select s).Any())
            {
                return "1";
            }
            else return "0";
        }

    


        // GET: api/admins/5
        [ResponseType(typeof(admin))]
        public IHttpActionResult Getadmin(string id)
        {
            admin admin = db.admins.Find(id);
            if (admin == null)
            {
                return NotFound();
            }

            return Ok(admin);
        }

        // PUT: api/admins/5
        [ResponseType(typeof(void))]
        public IHttpActionResult Putadmin(string id, admin admin)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != admin.username)
            {
                return BadRequest();
            }

            db.Entry(admin).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!adminExists(id))
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

        // POST: api/admins
        [ResponseType(typeof(admin))]
        public IHttpActionResult Postadmin(admin admin)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.admins.Add(admin);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (adminExists(admin.username))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = admin.username }, admin);
        }

        // DELETE: api/admins/5
        [ResponseType(typeof(admin))]
        public IHttpActionResult Deleteadmin(string id)
        {
            admin admin = db.admins.Find(id);
            if (admin == null)
            {
                return NotFound();
            }

            db.admins.Remove(admin);
            db.SaveChanges();

            return Ok(admin);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool adminExists(string id)
        {
            return db.admins.Count(e => e.username == id) > 0;
        }
    }
}