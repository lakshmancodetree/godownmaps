using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Dynamic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace APSWCMaps.WebApi
{
    [RoutePrefix("api/LatLong")]
    public class LatLongController : ApiController
    {
        [HttpPost]
        [Route("Latlongslist")]
        public dynamic Latlongslist([FromBody]dynamic root)
        {

            string jsondata = JsonConvert.SerializeObject(root);
            try
            {
                return Ok(Get_latlonglist(root));
            }
            catch (Exception ex)
            {
                throw new HttpResponseException(Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex.Message));
            }


        }

        public dynamic Get_latlonglist(dynamic root)
        {
            dynamic obj_data = new ExpandoObject();
            try
            {
                var json = JsonConvert.SerializeObject(root);
                dynamic objre = JsonConvert.DeserializeObject<ExpandoObject>(json);

                DataTable dt = GetlatlongsLivedata(objre);

                if (dt != null && dt.Rows.Count > 0)
                {

                    obj_data.Status = "Success";
                    obj_data.itdalist = dt;
                    obj_data.Reason = "Data Loaded Successfully";


                }
                else
                {
                    obj_data.Status = "Failure";
                    obj_data.Reason = " No Data Availbale";
                }

            }
            catch (Exception ex)
            {
                obj_data.Status = "Failure";
                obj_data.Reason = ex.Message.ToString();
            }
            finally
            {

            }
            return obj_data;
        }

        public DataTable Getlatlongsdata(dynamic obj)
        {
            try
            {
                SqlCommand cmd = new SqlCommand();

                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "Godwans_Gismap";
                cmd.Parameters.AddWithValue("@District", Convert.ToInt32(obj.DistrictId));
                cmd.Parameters.AddWithValue("@Typeselction", obj.typeofselectionvalue);
                cmd.Parameters.AddWithValue("@PTYPE", "1");

                DataTable result = ExecuteProcedureReturnDataTable(cmd);

                if (result != null && result.Rows.Count > 0)
                {
                    return result;
                }
                else
                {
                    return null;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }

        public DataTable GetlatlongsLivedata(dynamic obj)
        {
            try
            {
                SqlCommand cmd = new SqlCommand();

                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "sp_master_proc";
                cmd.Parameters.AddWithValue("@DIRECTION_ID", "1");
                cmd.Parameters.AddWithValue("@TYPEID", obj.typeofselectionvalue);
                cmd.Parameters.AddWithValue("@INPUT_01", Convert.ToInt32(obj.DistrictId));
                cmd.Parameters.AddWithValue("@INPUT_02", null);
                cmd.Parameters.AddWithValue("@INPUT_03", null);
                cmd.Parameters.AddWithValue("@INPUT_04", null);
                cmd.Parameters.AddWithValue("@INPUT_05", null);
                cmd.Parameters.AddWithValue("@INPUT_06", null);
                cmd.Parameters.AddWithValue("@INPUT_08", null);
                cmd.Parameters.AddWithValue("@INPUT_09", null);
                cmd.Parameters.AddWithValue("@INPUT_10", null);
                cmd.Parameters.AddWithValue("@INPUT_11", null);
                cmd.Parameters.AddWithValue("@INPUT_12", null);
                cmd.Parameters.AddWithValue("@INPUT_13", null);
                cmd.Parameters.AddWithValue("@INPUT_14", null);
                cmd.Parameters.AddWithValue("@INPUT_15", null);
                cmd.Parameters.AddWithValue("@INPUT_16", null);
                cmd.Parameters.AddWithValue("@INPUT_18", null);
                cmd.Parameters.AddWithValue("@INPUT_19", null);
                cmd.Parameters.AddWithValue("@INPUT_20", null);
                cmd.Parameters.AddWithValue("@INPUT_21", null);
                cmd.Parameters.AddWithValue("@INPUT_22", null);
                cmd.Parameters.AddWithValue("@INPUT_23", null);
                cmd.Parameters.AddWithValue("@INPUT_24", null);
                cmd.Parameters.AddWithValue("@INPUT_25", null);
                cmd.Parameters.AddWithValue("@INPUT_26", null);
                cmd.Parameters.AddWithValue("@INPUT_27", null);
                cmd.Parameters.AddWithValue("@INPUT_28", null);
                cmd.Parameters.AddWithValue("@INPUT_29", null);
                cmd.Parameters.AddWithValue("@INPUT_30", null);
                cmd.Parameters.AddWithValue("@INPUT_31", null);
                cmd.Parameters.AddWithValue("@INPUT_32", null);
                cmd.Parameters.AddWithValue("@INPUT_33", null);
                cmd.Parameters.AddWithValue("@INPUT_34", null);
                cmd.Parameters.AddWithValue("@INPUT_35", null);
                cmd.Parameters.AddWithValue("@USER_NAME", null);
                cmd.Parameters.AddWithValue("@CALL_SOURCE", null);
                cmd.Parameters.AddWithValue("@CALL_PAGE_ACTIVITY", null);
                cmd.Parameters.AddWithValue("@CALL_BRO_APP_VER", null);
                cmd.Parameters.AddWithValue("@CALL_MOBILE_MODEL", null);
                cmd.Parameters.AddWithValue("@CALL_LATITUDE", null);
                cmd.Parameters.AddWithValue("@CALL_LONGITUDE", null);
                cmd.Parameters.AddWithValue("@CALL_IP_IMEI", null);

                DataTable result = ExecuteProcedureReturnDataTable(cmd);

                if (result != null && result.Rows.Count > 0)
                {
                    return result;
                }
                else
                {
                    return null;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }

        public DataTable ExecuteProcedureReturnDataTable(SqlCommand cmd)
        {
            //string connectionString = "Server=DESKTOP-VLQRCN0\\SQLEXPRESS;database=APSWCMapsDB;Trusted_Connection=true;";
            string connectionString = "Server=10.96.33.242;database=APSWC;User=sa;Password=@p$wC#@dm!n2021;";

            DataTable dt = new DataTable();
            SqlConnection con = new SqlConnection(connectionString);

            try
            {

                cmd.Connection = con;
                con.Open();

                SqlDataAdapter adp = new SqlDataAdapter(cmd);
                adp.Fill(dt);
                con.Close();
                cmd.Dispose();
                return dt;
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                if (con.State == ConnectionState.Open)
                {
                    con.Close();
                    cmd.Dispose();
                }
            }

        }
    }
}