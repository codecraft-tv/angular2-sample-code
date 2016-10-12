import {ReflectiveInjector} from '@angular/core';
import {OpaqueToken} from '@angular/core';


// Simple Injector Example
{
  console.log("Simple Injector Example");
  class MandrillService {
  }
  class SendGridService {
  }

  let injector = ReflectiveInjector.resolveAndCreate([
    MandrillService,
    SendGridService
  ]);
  let emailService = injector.get(MandrillService);
  console.log(emailService);

  // Injector Caching Example
  {
    console.log("Injector Caching Example");
    let emailService1 = injector.get(MandrillService);
    let emailService2 = injector.get(MandrillService);
    console.log(emailService1 === emailService2); // true
  }

  // Injector Caching Caching State Sharing Example
  {
    console.log("Injector Caching Caching State Sharing Example");
    let emailService1 = injector.get(MandrillService);
    emailService1.foo = "moo";

    let emailService2 = injector.get(MandrillService);
    console.log(emailService2.foo); // moo
  }

}

//  Child Injector Forwards Request to Parent
{
  console.log("Child Injector Forwards Request to Parent");
  class EmailService {
  }

  let injector = ReflectiveInjector.resolveAndCreate([EmailService]);
  let childInjector = injector.resolveAndCreateChild([]);

  console.log(injector.get(EmailService) === childInjector.get(EmailService)); // true
}

//  Child Injector Returns Different Instance
{
  console.log("Child Injector Returns Different Instance");
  class EmailService {
  }
  class PhoneService {
  }

  let injector = ReflectiveInjector.resolveAndCreate([EmailService]);
  let childInjector = injector.resolveAndCreateChild([EmailService]);

  console.log(injector.get(EmailService) === childInjector.get(EmailService));
}