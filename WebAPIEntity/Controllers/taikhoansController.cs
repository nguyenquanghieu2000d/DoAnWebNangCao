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
using System.Data.SqlClient;
using System.Data.Entity.Migrations;

namespace WebAPIEntity.Controllers
{
    public class taikhoansController : ApiController
    {
        private quanlybanhangEntities db = new quanlybanhangEntities();

        // GET: api/taikhoans
        public IQueryable<taikhoan> Gettaikhoans()
        {
            return db.taikhoans;
        }



        [Route("Counttaikhoan")]
        public IHttpActionResult PostCounttaikhoan(taikhoan user)
        {
            var x = (from s in db.taikhoans
                    where
                            s.username.Contains(user.username) &&
                            s.hoten.Contains(user.hoten) &&
                            s.sdt.Contains(user.sdt) &&
                            s.diachi.Contains(user.diachi)
                    select new
                    {
                        username = s.username
                    }).OrderBy(p => p.username).ToList();

            return Ok(new { so_luong = x.Count });
        }


        // GET: api/taikhoans/numget=?skip=
        [Route("getUserPaging")]
        public IHttpActionResult Posttaikhoan( int numget, int skip, taikhoan user)
        {
            return Ok((from s in db.taikhoans
                    where
                            s.username.Contains(user.username) &&
                            s.hoten.Contains(user.hoten) &&
                            s.sdt.Contains(user.sdt) &&
                            s.diachi.Contains(user.diachi)
                    select new
                    {
                        username = s.username,
                        hoten = s.hoten,
                        password = s.password,
                        sdt = s.sdt,
                        diachi = s.diachi,
                        gioitinh = s.gioitinh
                    }
                    ).OrderBy(p => p.username).Skip(skip).Take(numget));
        }


        [Route("getUserbyID")]
        [ResponseType(typeof(taikhoan))]
        public IHttpActionResult GetUserByID(string username)
        {
            return Ok((from s in db.taikhoans
                    where s.username == username
                    select new
                    {
                        username = s.username,
                        hoten = s.hoten,
                        gioitinh = s.gioitinh,
                        sdt = s.sdt,
                        diachi = s.diachi,
                        password = s.password
                    }).First());

        }


        [Route("getListUser")]
        [HttpPost]
        [ResponseType(typeof(taikhoan))]
        public List<taikhoan> PostListUser(taikhoan user)
        {
            var g = (from s in db.taikhoans
                     where
                            s.username.Contains(user.username) &&
                            s.hoten.Contains(user.hoten) &&
                            s.sdt.Contains(user.sdt) &&
                            s.diachi.Contains(user.diachi)
                     select s).ToList();



            return g;
        }



        // PUT: api/taikhoans/5
        [ResponseType(typeof(void))]
        public string Puttaikhoan(string id, taikhoan taikhoan)
        {
            if (!ModelState.IsValid)
            {
                return "!ModelState.IsValid";
            }

            if (id != taikhoan.username)
            {
                return id + "     (id != taikhoan.username)";
            }

            db.Entry(taikhoan).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!taikhoanExists(id))
                {
                    return "Not Found";
                }
                else
                {
                    throw;
                }
            }

            return "1";
        }


        [Route("PostTaiKhoan")]
        public IHttpActionResult PosttaiKhoan(taikhoan taikhoan)
        {
            taikhoan taikhoan1 = db.taikhoans.Find(taikhoan.username);
            if(taikhoan1 == null)
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                db.taikhoans.Add(taikhoan);
                db.SaveChanges();
                return Ok(new { status = 1 });
            }
            else
            {
                return Ok(new { status = 0 });
            }
        }

        [Route("PutTaiKhoan")]
        [ResponseType(typeof(void))]
        public IHttpActionResult PutTaiKhoan(taikhoan taiKhoan)
        {
            taikhoan a = db.taikhoans.Find(taiKhoan.username);
            //return Ok(a.password);
            if (taiKhoan.password == null || taiKhoan.password == "")
            {
                taiKhoan.password = a.password;
                db.taikhoans.AddOrUpdate(taiKhoan);
            }
            else
            {
                a.password = taiKhoan.password;
                db.taikhoans.AddOrUpdate(a);
            }
           
            db.SaveChanges();
            return StatusCode(HttpStatusCode.NoContent);
        }

        [Route("DeleteTaiKhoan")]
        [HttpPost]
        [ResponseType(typeof(void))]
        public IHttpActionResult DeleteTaiKhoan(string username)
        {
            taikhoan taiKhoan1 = db.taikhoans.Find(username);
            if (taiKhoan1 == null)
            {
                return NotFound();
            }

            db.taikhoans.Remove(taiKhoan1);
            db.SaveChanges();

            return Ok();
        }



        // POST: api/taikhoans
        [ResponseType(typeof(taikhoan))]
        public string Posttaikhoan(taikhoan taikhoan)
        {
            string l = "INSERT INTO taikhoan  VALUES('"+ taikhoan.username +"','"+ taikhoan.password + "','"+taikhoan.hoten+"','"+taikhoan.gioitinh+"','"+ taikhoan.diachi +"','"+ taikhoan.sdt +"')";
            string connstring = @"Data Source=DESKTOP-CI5HV43;Initial Catalog=quanlybanhang;Integrated Security=True";
            SqlConnection conn = new SqlConnection(connstring);
            conn.Open();
            SqlCommand cmd = new SqlCommand(l, conn);
            cmd.ExecuteNonQuery();
            conn.Close();
            return "1";
            if (!ModelState.IsValid)
            {
                return "!ModelState.IsValid";
            }

            db.taikhoans.Add(taikhoan);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (taikhoanExists(taikhoan.username))
                {
                    return "-1";
                }
                else
                {
                    throw;

                }
            }

            return "1";
        }


        // POST: api/taikhoans
        



        [Route("ValidUser")]
        [ResponseType(typeof(taikhoan))]
        public string PostValidUser(taikhoan taikhoan)
        {
            if (!ModelState.IsValid)
            {
                return "!ModelState.IsValid";
            }
            if ((from s in db.taikhoans where s.username == taikhoan.username && s.password == taikhoan.password select s).Any())
            {
                return "1";
            }
            else return "0";
        }

        [Route("GetNameUser")]
        [ResponseType(typeof(taikhoan))]
        public string PostGetNameUser(taikhoan taikhoan)
        {
            if (!ModelState.IsValid)
            {
                return "!ModelState.IsValid";
            }
            if ((from s in db.taikhoans where s.username == taikhoan.username && s.password == taikhoan.password select s).Any())
            {
                var user = (from s in db.taikhoans where s.username == taikhoan.username && s.password == taikhoan.password select s).FirstOrDefault();
                return user.hoten;
            }
            else return "-1";
        }



        // DELETE: api/taikhoans/5
        [ResponseType(typeof(taikhoan))]
        public string Deletetaikhoan(taikhoan id)
        {
            taikhoan taikhoan = db.taikhoans.Find(id.username);
            if (taikhoan == null)
            {
                return "NotFound";
            }

            db.taikhoans.Remove(taikhoan);
            db.SaveChanges();

            return "1";
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool taikhoanExists(string id)
        {
            return db.taikhoans.Count(e => e.username == id) > 0;
        }
    }
}