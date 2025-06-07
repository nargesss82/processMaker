<?php 
// دریافت مقدار شناسه ترجمه (ID) از متغیر سراسری txt_id
$id = @@txt_id;

// ساخت رشته کوئری SQL برای انتخاب تمام ستون‌ها از جدول PMT_TRANSLATION که شناسه آن برابر با $id باشد
$query = "SELECT * FROM PMT_TRANSLATION WHERE ID=$id";

// اجرای کوئری و دریافت نتیجه در متغیر $result
$result = executeQuery($query);

// استخراج و ذخیره مقادیر ستون‌های مورد نظر از اولین رکورد نتیجه کوئری
// توجه: ایندکس 1 فرض شده که اولین ردیف داده است، ممکن است بر اساس ساختار آرایه متفاوت باشد

@@order_name     = $result[1]["ORDER_NAME"];     // نام سفارش
@@user_name      = $result[1]["USER_ID"];        // شناسه کاربر
@@cost           = $result[1]["COST"];           // هزینه سفارش
@@time           = $result[1]["TIME"];           // زمان سفارش
@@translatorId   = $result[1]["TRANSLATOR_ID"];  // شناسه مترجم مرتبط
