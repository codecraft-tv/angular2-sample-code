import {ReflectiveInjector} from '@angular/core';
import {InjectionToken} from '@angular/core';

// String Token (Fail Case) Example
{
  console.log("String Token (Fail Case) Example");
  class MandrillService {
  }
  class SendGridService {
  }

  let MandrillServiceToken = "EmailService";
  let SendGridServiceToken = "EmailService";

  let injector = ReflectiveInjector.resolveAndCreate([
    {provide: SendGridServiceToken, useClass: SendGridService},
    {provide: MandrillServiceToken, useClass: MandrillService},
  ]);

  let emailService1 = injector.get(SendGridServiceToken);
  let emailService2 = injector.get(MandrillServiceToken);
  console.log(emailService1 === emailService2);
}

// OpaqueToken
{
  console.log("InjectionToken");
  class MandrillService {
  }
  class SendGridService {
  }

  const MandrillServiceToken = new InjectionToken<string>("EmailService");
  const SendGridServiceToken = new InjectionToken<string>("EmailService");

  let injector = ReflectiveInjector.resolveAndCreate([
    {provide: SendGridServiceToken, useClass: SendGridService},
    {provide: MandrillServiceToken, useClass: MandrillService},
  ]);

  let emailService1 = injector.get(SendGridServiceToken);
  let emailService2 = injector.get(MandrillServiceToken);
  console.log(emailService1 === emailService2);  // false
}