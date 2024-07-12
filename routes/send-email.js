const { EMAIL_ACCOUNT_ENV_PATH, LOGGER_PATH } = require('../paths');
require('dotenv').config({path: EMAIL_ACCOUNT_ENV_PATH});

const logger = require(LOGGER_PATH);
const nodemailer = require("nodemailer");

const express = require('express');
const router = express.Router();
const postLoggerDecorator = require("../decorators/loggerDecorator");

router.use(express.json());

router.post('/send-email', postLoggerDecorator((req, res) => {
    const { to, authNumber } = req.body;
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        service: 'gmail',
        auth: {
            user: process.env.ID,
            pass: process.env.PASSWORD,
        },
    });

    const mailOptions = {
        from: 'webmaster@eximbay.com',
        to: to,
        subject: '엑심베이 이메일 인증키 발급 안내',
        html: `
        <html>
        <body>
        <div>
        <table width="700" cellpadding="0" cellspacing="0" border="0" align="center" style="padding-top:0px;padding-left:40px;padding-right:40px;border-top:4px solid rgb(0,73,248)">    
        <tbody>    
        <tr>        
        <td style="padding-top:40px;padding-bottom:40px">            
        <a href="https://www.eximbay.com/" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://www.eximbay.com/&amp;source=gmail&amp;ust=1709969781127000&amp;usg=AOvVaw28i_3sIXEm2e1FvPpgIQwO">                <img src="https://ci3.googleusercontent.com/meips/ADKq_NbUjavGnM4O-eULV_eUul-OceJmxeZEvnvew4hm6-cHiNEO_-y3kEQ86-K4LhYZQToAvRd78s8OJE-RRQq99xrF0YYqkSEm9BjEm9OKhw=s0-d-e1-ft#https://img-cld.eximbay.com/images/eximbay_logo_2020.png" width="123" height="17" alt="엑심베이 로고" style="display:block;border:0px" class="CToWUd" data-bit="iit"></a>        
        </td>    
        </tr>    
        <tr>        
        <td style="padding-top:30px;padding-bottom:10px;font-family:나눔고딕,돋움,dotum,Helvetica,Arial,san-serif;font-weight:900;font-size:20px"> 엑심베이 이메일 인증키 발급 안내 </td>    
        </tr>    
        <tr>        
        <td style="padding-top:30px;padding-bottom:10px;font-family:나눔고딕,돋움,dotum,Helvetica,Arial,san-serif;font-size:14px"> 안녕하세요, 엑심베이 입니다. </td>    
        </tr>    
        <tr>        
        <td style="padding-top:15px;padding-bottom:45px;line-height:1.8;font-size:14px"> 엑심베이 회원가입을 위한 인증키가 발급되었습니다. <br>아래의 인증번호를 입력하시면 본인인증이 완료됩니다. </td>    
        </tr>    
        <tr>        
        <td style="padding-bottom:10px;font-size:14px"><strong>본인인증 인증번호</strong></td>    
        </tr>    
        <tr>        
        <td align="center" style="padding:20px;background-color:rgb(238,238,238)"><strong style="color:rgb(102,102,102);font-size:24px"> ${authNumber}</strong></td>    
        </tr>    
        <tr>        
        <td height="130" style="font-size:0px;line-height:0">&nbsp;
        </td>    
        </tr>    
        </tbody>
        </table><font color="#888888"></font>
        <table width="700" align="center" cellpadding="0" cellspacing="0" border="0" style="padding-top:30px">    
        <tbody>
        <tr style="background:rgb(249,249,249)">        
        <td width="20%" align="center">            
        <a href="https://www.eximbay.com/" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://www.eximbay.com/&amp;source=gmail&amp;ust=1709969781127000&amp;usg=AOvVaw28i_3sIXEm2e1FvPpgIQwO"><img src="https://ci3.googleusercontent.com/meips/ADKq_Nauol5KL27Htm18lGTFdEXT68MPLB3qkNBX8I_lQ4kw3JHL2kIgyLFr6U0Ql39fC_v9GoRF0moZRuPigpf3Bpzw5KeXNQjUBi1S9dhsHE4J0g=s0-d-e1-ft#https://img-cld.eximbay.com/images/eximbay_logo_sm_2020.png" alt="eximbay" style="display:block;border:0px" class="CToWUd" data-bit="iit"></a>        
        </td>        
        <td width="80%" style="padding-top:15px;padding-bottom:10px;padding-right:20px">            
        <address style="font-size:11px;font-family:나눔고딕,Verdana;line-height:1.9;font-style:normal">
        <p style="margin-top:5px;margin-bottom:3px"><strong>(주)엑심베이</strong><br>서울특별시 구로구 디지털로26길 111, 1101호 (구로동, 제이앤케이디지털타워) 08390<br>사업자등록번호: 113-86-37262</p>
        <p>ⓒ 2023 Eximbay Co., Ltd. ALL RIGHTS RESERVED</p><font color="#888888"></font>
        </address>
        <font color="#888888"></font>
        </td>
        </tr>
        </tbody>
        </table>
        </div>
        </body>
        </html>
        `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            logger.error(`Sending mail failed. -> ${error.toString()}`);
            return res
                    .status(500)
                    .send(error.toString());
        }
        res
                .status(200)
                .send('Email sent: ' + info.response);
    });
}));

module.exports = router;