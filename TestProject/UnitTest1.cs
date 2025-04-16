using Microsoft.EntityFrameworkCore;
using NUnit.Framework;
using System.Linq;
using System.Reflection;
using System;
using System.Threading.Tasks;
using Newtonsoft.Json;
using System.Net;
using System.Net.Http;
using System.Text;

namespace dotnetapp.Tests
{
    [TestFixture]
    public class Tests
    {

 [Test, Order(1)]
public async Task Backend_Test_Method_GetCakeById_In_CakeService_Exists()
{
            // Load assembly and types
            string assemblyName = "dotnetapp";
            Assembly assembly = Assembly.Load(assemblyName);
            string serviceName = "dotnetapp.Services.CakeService";

            Type serviceType = assembly.GetType(serviceName);

            // Get the GetCakeById method
            MethodInfo getCakeByIdMethod = serviceType.GetMethod("GetCakeById");

            if (getCakeByIdMethod != null)
            {
                Assert.Pass();

            }
            else
            {
                Assert.Fail();
            }
}

 [Test, Order(2)]
public async Task Backend_Test_Method_GetAllCakes_In_CakeService_Exists()
{
            // Load assembly and types
            string assemblyName = "dotnetapp";
            Assembly assembly = Assembly.Load(assemblyName);
            string serviceName = "dotnetapp.Services.CakeService";

            Type serviceType = assembly.GetType(serviceName);

            // Get the GetCakeById method
            MethodInfo Method = serviceType.GetMethod("GetAllCakes");

            if (Method != null)
            {
                Assert.Pass();

            }
            else
            {
                Assert.Fail();
            }
}
 [Test, Order(3)]
public async Task Backend_Test_Method_AddCake_In_CakeService_Exists()
{
            // Load assembly and types
            string assemblyName = "dotnetapp";
            Assembly assembly = Assembly.Load(assemblyName);
            string serviceName = "dotnetapp.Services.CakeService";

            Type serviceType = assembly.GetType(serviceName);

            // Get the GetCakeById method
            MethodInfo Method = serviceType.GetMethod("AddCake");

            if (Method != null)
            {
                Assert.Pass();

            }
            else
            {
                Assert.Fail();
            }
}
 [Test, Order(4)]
public async Task Backend_Test_Method_UpdateCake_In_CakeService_Exists()
{
            // Load assembly and types
            string assemblyName = "dotnetapp";
            Assembly assembly = Assembly.Load(assemblyName);
            string serviceName = "dotnetapp.Services.CakeService";

            Type serviceType = assembly.GetType(serviceName);

            // Get the GetCakeById method
            MethodInfo Method = serviceType.GetMethod("UpdateCake");

            if (Method != null)
            {
                Assert.Pass();

            }
            else
            {
                Assert.Fail();
            }
}

 [Test, Order(5)]
public async Task Backend_Test_Method_DeleteCake_In_CakeService_Exists()
{
            // Load assembly and types
            string assemblyName = "dotnetapp";
            Assembly assembly = Assembly.Load(assemblyName);
            string serviceName = "dotnetapp.Services.CakeService";

            Type serviceType = assembly.GetType(serviceName);

            // Get the GetCakeById method
            MethodInfo Method = serviceType.GetMethod("DeleteCake");

            if (Method != null)
            {
                Assert.Pass();

            }
            else
            {
                Assert.Fail();
            }
}
    
 [Test, Order(6)]
public async Task Backend_Test_Method_GetAllCakes_In_CakeController_Exists()
{
            // Load assembly and types
            string assemblyName = "dotnetapp";
            Assembly assembly = Assembly.Load(assemblyName);
            string serviceName = "dotnetapp.Controllers.CakeController";

            Type serviceType = assembly.GetType(serviceName);

            // Get the GetCakeById method
            MethodInfo Method = serviceType.GetMethod("GetAllCakes");

            if (Method != null)
            {
                Assert.Pass();

            }
            else
            {
                Assert.Fail();
            }
}
    

 [Test, Order(7)]
public async Task Backend_Test_Method_GetCakeById_In_CakeController_Exists()
{
            // Load assembly and types
            string assemblyName = "dotnetapp";
            Assembly assembly = Assembly.Load(assemblyName);
            string serviceName = "dotnetapp.Controllers.CakeController";

            Type serviceType = assembly.GetType(serviceName);

            // Get the GetCakeById method
            MethodInfo Method = serviceType.GetMethod("GetCakeById");

            if (Method != null)
            {
                Assert.Pass();

            }
            else
            {
                Assert.Fail();
            }
}
    

 [Test, Order(8)]
public async Task Backend_Test_Method_AddCake_In_CakeController_Exists()
{
            // Load assembly and types
            string assemblyName = "dotnetapp";
            Assembly assembly = Assembly.Load(assemblyName);
            string serviceName = "dotnetapp.Controllers.CakeController";

            Type serviceType = assembly.GetType(serviceName);

            // Get the GetCakeById method
            MethodInfo Method = serviceType.GetMethod("AddCake");

            if (Method != null)
            {
                Assert.Pass();

            }
            else
            {
                Assert.Fail();
            }
}
    

 [Test, Order(9)]
public async Task Backend_Test_Method_UpdateCake_In_CakeController_Exists()
{
            // Load assembly and types
            string assemblyName = "dotnetapp";
            Assembly assembly = Assembly.Load(assemblyName);
            string serviceName = "dotnetapp.Controllers.CakeController";

            Type serviceType = assembly.GetType(serviceName);

            // Get the GetCakeById method
            MethodInfo Method = serviceType.GetMethod("UpdateCake");

            if (Method != null)
            {
                Assert.Pass();

            }
            else
            {
                Assert.Fail();
            }
}
    

 [Test, Order(10)]
public async Task Backend_Test_Method_DeleteCake_In_CakeController_Exists()
{
            // Load assembly and types
            string assemblyName = "dotnetapp";
            Assembly assembly = Assembly.Load(assemblyName);
            string serviceName = "dotnetapp.Controllers.CakeController";

            Type serviceType = assembly.GetType(serviceName);

            // Get the GetCakeById method
            MethodInfo Method = serviceType.GetMethod("DeleteCake");

            if (Method != null)
            {
                Assert.Pass();

            }
            else
            {
                Assert.Fail();
            }
}
    

 [Test, Order(11)]
public async Task Backend_Test_Method_Login_In_AuthenticationController_Exists()
{
            // Load assembly and types
            string assemblyName = "dotnetapp";
            Assembly assembly = Assembly.Load(assemblyName);
            string serviceName = "dotnetapp.Controllers.AuthenticationController";

            Type serviceType = assembly.GetType(serviceName);

            // Get the GetCakeById method
            MethodInfo Method = serviceType.GetMethod("Login");

            if (Method != null)
            {
                Assert.Pass();

            }
            else
            {
                Assert.Fail();
            }
}
    

 [Test, Order(12)]
public async Task Backend_Test_Method_Register_In_AuthenticationController_Exists()
{
            // Load assembly and types
            string assemblyName = "dotnetapp";
            Assembly assembly = Assembly.Load(assemblyName);
            string serviceName = "dotnetapp.Controllers.AuthenticationController";

            Type serviceType = assembly.GetType(serviceName);

            // Get the GetCakeById method
            MethodInfo Method = serviceType.GetMethod("Register");

            if (Method != null)
            {
                Assert.Pass();

            }
            else
            {
                Assert.Fail();
            }
}
    
}
}

