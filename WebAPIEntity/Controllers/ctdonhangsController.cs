using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Data.Entity.Migrations;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using WebAPIEntity;

namespace WebAPIEntity.Controllers
{
    public class ctdonhangsController : ApiController
    {
        private quanlybanhangEntities db = new quanlybanhangEntities();
        // GET: api/ctdonhangs
        public IQueryable<ctdonhang> Getctdonhangs()
        {
            return db.ctdonhangs;
        }

        



        [Route("GetGioHang")]
        public IHttpActionResult GetGioHang(string username)
        {
            while (true)
            {
                try
                {
                    var listHang = (from s in db.hangs
                                join e in db.ctdonhangs on s.ma_hang equals e.ma_hang
                                join k in db.donhangs on e.ma_don_hang equals k.ma_don_hang
                                where k.username == username && k.tinhtrangthanhtoan == 0
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
                                    e.so_luong,
                                    thanh_tien = s.gia_moi * e.so_luong
                                }).ToList();
                    return Ok(listHang);
                
                }
                catch (System.Data.Entity.Core.EntityCommandExecutionException e)
                {

                }
                catch (System.Data.SqlClient.SqlException e)
                {

                }
                finally
                {

                }
            }   
        }


        [Route("GetSoLuongGioHang")]
        public IHttpActionResult GetSoLuongGioHang(string username)
        {
            string count = "0";
            while (true)
            {
                try
                {
                    count = (from s in db.hangs
                             join e in db.ctdonhangs on s.ma_hang equals e.ma_hang
                             join k in db.donhangs on e.ma_don_hang equals k.ma_don_hang
                             where k.username == username && k.tinhtrangthanhtoan == 0
                             select new
                             {
                                 e.ma_hang
                             }).ToList().Count.ToString();
                    break;
                }
                catch (System.Data.Entity.Core.EntityCommandExecutionException e)
                {

                }
                catch (System.Data.SqlClient.SqlException e)
                {

                }
                finally
                {

                }
            }
           

            
            if (count == "0")
            {
                return Ok(0);
            }
            else
            {
                while (true)
                {
                    try
                    {
                        return Ok((from s in db.hangs
                                   join e in db.ctdonhangs on s.ma_hang equals e.ma_hang
                                   join k in db.donhangs on e.ma_don_hang equals k.ma_don_hang
                                   where k.username == username && k.tinhtrangthanhtoan == 0
                                   select new
                                   {
                                       e.so_luong
                                   }).ToList().Sum(p => p.so_luong));
                    }
                    catch (System.Data.Entity.Core.EntityCommandExecutionException e)
                    {

                    }
                    catch (System.Data.SqlClient.SqlException e)
                    {

                    }
                    finally
                    {

                    }
                }
                
            }
        }







        public void UpdateGioHang(string username)
        {
         
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
                        a.thanhtien = 0;
                        db.donhangs.Add(a);
                        db.SaveChanges();

                    }
                
            
        }



        [Route("UpdateTH")]
        public IHttpActionResult GetGioHangTH(string username)
        {
            UpdateGioHang(username);
            return Ok(new { id = '2' });
            //var x = ()

        }



        

        [Route("MergeDonhang")]
        [ResponseType(typeof(ctdonhang))]
        public string PostCTdonhangReactjs(string username, ctdonhang data)
        {
            string k = (from s in db.donhangs
                        where s.username == username && s.tinhtrangthanhtoan == 0
                        select new
                        {
                            kd = s.ma_don_hang
                        }).FirstOrDefault().kd;
            var x = (from s in db.ctdonhangs
                     join p in db.donhangs on s.ma_don_hang equals p.ma_don_hang
                     where p.username == username
                     && p.tinhtrangthanhtoan == 0
                     && s.ma_hang == data.ma_hang
                     select new
                     {
                         so_luong = s.so_luong
                     }).SingleOrDefault();

            data.ma_don_hang = k;

            if (x == null)
            {
                db.ctdonhangs.Add(data);
            }
            else
            {
                data.so_luong = data.so_luong + x.so_luong;
                db.ctdonhangs.AddOrUpdate(data);
            }
            db.SaveChanges();
            return "1";
        }

        [Route("ThemCTDonHang_ThemMoi")]
        [ResponseType(typeof(ctdonhang))]
        public string PostCTdonhangList_(string username, ctdonhang data)
        {
            var k = (from s in db.donhangs
                     where s.username == username && s.tinhtrangthanhtoan == 0
                     select new
                     {
                         kd = s.ma_don_hang
                     }).FirstOrDefault().kd;
            var x = (from s in db.ctdonhangs
                     join p in db.donhangs on s.ma_don_hang equals p.ma_don_hang
                     where p.username == username
                     && p.tinhtrangthanhtoan == 0
                     && s.ma_hang == data.ma_hang
                     select new
                     {
                         k = s.so_luong
                     }).SingleOrDefault();

            data.ma_don_hang = k;

            if (x == null)
            {
                db.ctdonhangs.Add(data);
            }
            else
            {
                data.so_luong = data.so_luong;
                db.ctdonhangs.AddOrUpdate(data);
            }
            db.SaveChanges();
            return "1";
        }


        [Route("ThemCTDonHang")]
        [ResponseType(typeof(ctdonhang))]
        public string PostCTdonhangList(string username, ctdonhang data)
        {
            var k = (from s in db.donhangs
                     where s.username == username && s.tinhtrangthanhtoan == 0
                     select new
                     {
                         kd = s.ma_don_hang
                     }).FirstOrDefault().kd;
            var x = (from s in db.ctdonhangs
                     join p in db.donhangs on s.ma_don_hang equals p.ma_don_hang
                     where p.username == username
                     && p.tinhtrangthanhtoan == 0
                     && s.ma_hang == data.ma_hang
                     select new
                     {
                         k = s.so_luong
                     }).SingleOrDefault();

            data.ma_don_hang = k;

            if (x == null)
            {
                db.ctdonhangs.Add(data);
            }
            else
            {
                data.so_luong = data.so_luong + x.k;
                db.ctdonhangs.AddOrUpdate(data);
            }
            db.SaveChanges();
            return "1";
        }





        // GET: api/ctdonhangs/5
        [ResponseType(typeof(ctdonhang))]
        public IHttpActionResult Getctdonhang(string id_don_hang)
        {
            var x = (from s in db.ctdonhangs
                     join e in db.hangs on s.ma_hang equals e.ma_hang
                     where s.ma_don_hang == id_don_hang
                     select new
                     {
                         e.ma_hang,
                         e.ten_hang,
                         e.gia_cu,
                         e.gia_moi,
                         e.thuong_hieu,
                         e.hinh_dai_dien,
                         e.mo_ta,
                         s.so_luong
                     }).ToList();
            return Ok(x);
        }

        // PUT: api/ctdonhangs/5
        [ResponseType(typeof(void))]
        public IHttpActionResult Putctdonhang(string id, ctdonhang ctdonhang)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != ctdonhang.ma_don_hang)
            {
                return BadRequest();
            }

            db.Entry(ctdonhang).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ctdonhangExists(id))
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

        // POST: api/ctdonhangs
        [ResponseType(typeof(ctdonhang))]
        public IHttpActionResult Postctdonhang(ctdonhang ctdonhang)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.ctdonhangs.Add(ctdonhang);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (ctdonhangExists(ctdonhang.ma_don_hang))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = ctdonhang.ma_don_hang }, ctdonhang);
        }

        // DELETE: api/ctdonhangs/5
        [ResponseType(typeof(ctdonhang))]
        public IHttpActionResult Deletectdonhang(string id)
        {
            ctdonhang ctdonhang = db.ctdonhangs.Find(id);
            if (ctdonhang == null)
            {
                return NotFound();
            }

            db.ctdonhangs.Remove(ctdonhang);
            db.SaveChanges();

            return Ok(ctdonhang);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ctdonhangExists(string id)
        {
            return db.ctdonhangs.Count(e => e.ma_don_hang == id) > 0;
        }
    }
}