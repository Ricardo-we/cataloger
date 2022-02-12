from django.shortcuts import render, redirect
import smtplib
# Create your views here.
def homepage(request):
    if(request.method == 'POST'):
        subject = request.POST.get('name')
        email = request.POST.get('email')
        message = request.POST.get('message')
        final_mail = f'''
        From: {email}
        Name: {subject}, 
        {message}
        '''
        print(final_mail)
        try:
            smtp_server = smtplib.SMTP('smtp.gmail.com', 587)
            smtp_server.starttls()
            smtp_server.login('testerricardo50@gmail.com','mami_1981')

            smtp_server.sendmail('testerricardo50@gmail.com', 'testerricardo50@gmail.com',final_mail)
            smtp_server.quit()
            return redirect('/')
        except:
            return render(request, 'homepage/homepage.html',{'message': 'failed'})
    return render(request, 'homepage/homepage.html',{'message': ''})
