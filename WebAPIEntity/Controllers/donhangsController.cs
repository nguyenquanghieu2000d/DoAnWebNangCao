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
    public class donhangsController : ApiController
    {
        private quanlybanhangEntities db = new quanlybanhangEntities();

        // GET: api/donhangs
        public IHttpActionResult Getdonhangs()
        {
            return Ok(db.donhangs.Where(p=>p.username == "1").Select(p=>p.ma_don_hang).ToList());
        }

        [Route("GetHangbyUser")]
        [ResponseType(typeof(donhang))]
        public IHttpActionResult GetHangbyUser(string username)
        {
            return Ok((from s in db.donhangs where s.username == username select new
            {
                ma_don_hang = s.ma_don_hang,
                username = s.username,
                dia_chi = s.dia_chi,
                thanhtien = s.thanhtien,
                hoten_dh = s.hoten_dh,
                sdt_dh = s.sdt_dh,
                ngay_thanh_toan = s.ngay_thanh_toan
            }));
        }







        // GET: api/donhangs/5
        [ResponseType(typeof(donhang))]
        [Route("GetTongTienGioHang")]
        public IHttpActionResult GetTongTienGioHang(string username)
        {
            
            try
            {
                var donhang = (from s in db.donhangs
                               where s.tinhtrangthanhtoan == 0
                               && s.username == username
                               select new
                               {
                                   tong_tien = s.thanhtien
                               }).FirstOrDefault();
                if (donhang == null)
                {
                    return Ok(new { tong_tien = 0 });
                }
                else
                {
                    return Ok(new { tong_tien = donhang.tong_tien });
                    
                }

                

            }
            catch(NullReferenceException e)
            {
                return Ok(new { tong_tien = 0 });
            }
            
           
        }

        // PUT: api/donhangs/5
        [ResponseType(typeof(void))]
        public IHttpActionResult Putdonhang(string id, donhang donhang)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != donhang.ma_don_hang)
            {
                return BadRequest();
            }

            db.Entry(donhang).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!donhangExists(id))
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


        [Route("SuaThongTinDonHang")]
        public IHttpActionResult PutSuaThongTinDonHang(string username, donhang donhang)
        {
            donhang giohang = (from s in db.donhangs where s.tinhtrangthanhtoan == 0 && s.username == username select s).SingleOrDefault();
            giohang.hoten_dh = donhang.hoten_dh;
            giohang.sdt_dh = donhang.sdt_dh;
            giohang.dia_chi = donhang.dia_chi;
            giohang.ngay_thanh_toan = DateTime.Now;
            //db.Entry(donhang).State = EntityState.Modified;
            db.SaveChanges();
            return Ok(new { reso = 1 });
            //db.Entry(giohang).CurrentValues.SetValues(updatedUser);

        }

        [Route("ThanhToan")]
        public IHttpActionResult PutThanhToan(string username)
        {
            donhang giohang = (from s in db.donhangs where s.tinhtrangthanhtoan == 0 && s.username == username select s).SingleOrDefault();
            giohang.tinhtrangthanhtoan = 1;
            db.SaveChanges();

            var x = (from s in db.donhangs
                     where s.username == username && s.tinhtrangthanhtoan == 0
                     select new
                     {
                         ma_don_hang = s.ma_don_hang,
                         username = s.username,
                         dia_chi = s.dia_chi,
                         thanhtien = s.thanhtien,
                         tinhtrangthanhtoan = s.tinhtrangthanhtoan,
                         hoten_dh = s.hoten_dh,
                         sdt_dh = s.sdt_dh,
                         ngay_thanh_toan = s.ngay_thanh_toan
                     }).ToList();
            if (x.Count == 0)
            {
                donhang a = new donhang();
                a.ma_don_hang = db.p_donhang().FirstOrDefault();
                a.username = username;
                a.tinhtrangthanhtoan = 0;
                db.donhangs.Add(a);
                db.SaveChanges();
            }
            db.SaveChanges();
            return Ok(new { reso = 1 });
        }


        // POST: api/donhangs
        [ResponseType(typeof(donhang))]
        public IHttpActionResult Postdonhang(donhang donhang)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.donhangs.Add(donhang);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (donhangExists(donhang.ma_don_hang))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = donhang.ma_don_hang }, donhang);
        }

        // DELETE: api/donhangs/5
        [ResponseType(typeof(donhang))]
        public IHttpActionResult Deletedonhang(string id)
        {
            donhang donhang = db.donhangs.Find(id);
            if (donhang == null)
            {
                return NotFound();
            }

            db.donhangs.Remove(donhang);
            db.SaveChanges();

            return Ok(donhang);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool donhangExists(string id)
        {
            return db.donhangs.Count(e => e.ma_don_hang == id) > 0;
        }
    }
}