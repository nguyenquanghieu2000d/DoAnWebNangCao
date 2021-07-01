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
        public IQueryable<donhang> Getdonhangs()
        {
            return db.donhangs;
        }



        [Route("CountDonHang")]

        public IHttpActionResult PostCountCTTheLoai(donhang donhang)
        {
            List<string> sn = donhang.email_dh.ToString().Split('*').ToList();
            int GiaThap = int.Parse(sn[0]);
            int GiaCao = int.Parse(sn[1]);
            DateTime NgayBatDau = DateTime.Parse(sn[2]);
            DateTime NgayKetThuc = DateTime.Parse(sn[3]);
            var x = (from s in db.donhangs
                     where s.ma_don_hang.Contains(donhang.ma_don_hang) &&
                          s.username.Contains(donhang.username) &&
                          s.dia_chi.Contains(donhang.dia_chi) &&
                          s.thanhtien.Value > GiaThap &&
                          s.thanhtien.Value < GiaCao &&
                          s.ngay_thanh_toan > NgayBatDau &&
                          s.ngay_thanh_toan < NgayKetThuc &&
                          s.hoten_dh.Contains(donhang.hoten_dh) &&
                          s.sdt_dh.Contains(donhang.sdt_dh) &&
                          s.tinhtrangthanhtoan == 1
                          //s.ngay_thanh_toan.
                          
                     select new
                     {
                         ma_don_hang = s.ma_don_hang
                     }).ToList();
            return Ok(new { so_luong = x.Count });
        }



        [Route("getDonHangPaging")]
        public IHttpActionResult PostCTTheLoaiPhanTrang(int numget, int skip, donhang donhang)
        {
            List<string> sn = donhang.email_dh.ToString().Split('*').ToList();
            int GiaThap = int.Parse(sn[0]);
            int GiaCao = int.Parse(sn[1]);
            DateTime NgayBatDau = DateTime.Parse(sn[2]);
            DateTime NgayKetThuc = DateTime.Parse(sn[3]);
            var x = (from s in db.donhangs
                     where s.ma_don_hang.Contains(donhang.ma_don_hang) &&
                          s.username.Contains(donhang.username) &&
                          s.dia_chi.Contains(donhang.dia_chi) &&
                          s.thanhtien.Value > GiaThap &&
                          s.thanhtien.Value < GiaCao &&
                          s.ngay_thanh_toan > NgayBatDau &&
                          s.ngay_thanh_toan < NgayKetThuc &&
                          s.hoten_dh.Contains(donhang.hoten_dh) &&
                          s.sdt_dh.Contains(donhang.sdt_dh) &&
                          s.tinhtrangthanhtoan == 1
                     //s.ngay_thanh_toan.

                     select new
                     {
                         ma_don_hang = s.ma_don_hang,
                          username = s.username,
                          dia_chi = s.dia_chi,
                          thanhtien = s.thanhtien,
                          ngay_thanh_toan = s.ngay_thanh_toan,
                          hoten_dh = s.hoten_dh,
                          sdt_dh = s.sdt_dh
                     }).ToList().Skip(skip).Take(numget);
            return Ok(x);

        }









        // GET: api/donhangs/5
        [ResponseType(typeof(donhang))]
        public IHttpActionResult Getdonhang(string id)
        {
            donhang donhang = db.donhangs.Find(id);
            if (donhang == null)
            {
                return NotFound();
            }

            return Ok(donhang);
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