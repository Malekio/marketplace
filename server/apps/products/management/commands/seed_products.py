from django.core.management.base import BaseCommand
from django.db import transaction
from apps.products.models import Product, ProductImage
from apps.users.models import User, Seller
import json

class Command(BaseCommand):
    help = 'Seed the database with products from the frontend data/products.js'

    def handle(self, *args, **options):
        # Product data from frontend
        products_data = [
            {
                "id": 1,
                "name": "Wireless Audio Pro",
                "price": 299.00,
                "vendor": "TechWorld",
                "imageUrl": "https://lh3.googleusercontent.com/aida-public/AB6AXuBlwnxUEkgyi-fVUDOgjyZwy5Q4xa5_3w17PHHywzo_Z9mINr_UL-nzCtKusB7fdFvVjm8L39RIaJ8R16t9SWShlCIpQspTt6YOUv4Zja8DAxmfcaioeDxy_IsrmjMmaxv0CfloWSi9bU2NHSiiDxQUAVTK1MmpQAboL0dgb0kBLD_eDJ8FOcBKwJJhg1eClFodR1leiOjjngYPF-NO6BgRjZ1gpWW8FFpH1lxRdaYfxD7tLgodIvMbmNZUbrTeknz8lsTgbXrrMYyV",
                "isVerified": True,
                "altText": "High-end wireless noise cancelling headphones",
                "rating": 4.8,
                "reviews": 234,
                "category": "Tech"
            },
            {
                "id": 2,
                "name": "Organic Espresso Blend",
                "price": 24.50,
                "vendor": "GreenBean",
                "imageUrl": "https://lh3.googleusercontent.com/aida-public/AB6AXuAYcPvReTy1xOWNSz3LlTAfKw4JybOvBjibrolzLF60x5z0wE8rBmYZRH1_WvnLNpmuTBMmMh_HB0E7PRbPo8f5_VbYg8ePkSG80abKdpdfzIKDctDsMnYxq7795MqMHTPFesg-3WyaJ2FAvttFjmMOoT0gBEjCXuXLf55Iord-yffO_-SQKNmEN9H_aQYzT-goFLbLfPZRvDB4rimyUbKQVR3bxe1TOVaz5_fGORiYCO5LNViAaGGgAgkt7oTv92Wn3-2rNF4i0IEj",
                "isVerified": False,
                "altText": "Premium organic whole bean coffee",
                "rating": 4.6,
                "reviews": 89,
                "category": "Groceries"
            },
            {
                "id": 3,
                "name": "Vanguard Smartwatch S3",
                "price": 499.00,
                "vendor": "WristCo",
                "imageUrl": "https://lh3.googleusercontent.com/aida-public/AB6AXuBSOl-aYUc6WrNHbKKZYJx30D_OiDehGapUcje6KdDKGm8NRGJWfOBZopwVmwT9E3S9KCYk72vWuNmqTdezfk4GHCDCexCthRIsJLlg7EcPmBDUH1KbxFcdOQU5JSZ_WvNavVct0Asognj5A7jF-fmDC2eFNnLcO_eu2UXjdKIn8pyWIqrPvSCNqmPJs84rVGBKaYqSmRUtOzAjAw32In756Xt_jm4EaUsAslVot3o8i2lYN0NpRk7PevGZixfgCwDplcvthGJoXVFv",
                "isVerified": False,
                "altText": "Minimalist design smart watch",
                "rating": 4.7,
                "reviews": 156,
                "category": "Tech"
            },
            {
                "id": 4,
                "name": "Classic Leather Wallet",
                "price": 55.00,
                "vendor": "Hide&Sons",
                "imageUrl": "https://lh3.googleusercontent.com/aida-public/AB6AXuCTIuXTPNW14VuQqdIisIvY4PqqYR-mqqBNf-jWksEYzbB4SMh7VdIeLSgo6DTMvAi4snvgryuNNPnfErT0j3lZfDOy9RjHFDw92oicpRaLujY3iHA6VW1CkoIu24wuuiJaMRURmAF-0O9d74A4ZdWRHVxxP8vW2YBOvdFa9QqxEwYF2D94qtaMeGs-w8QapBsuOuUdeXh2Qw2YEmFj50_hj9js_djaJrUgtzWyxTUUOZORKGvzFV1UTXmHbaTrwm7OS-WgX5wQOeYa",
                "isVerified": False,
                "altText": "Handcrafted leather bifold wallet",
                "rating": 4.5,
                "reviews": 112,
                "category": "Fashion"
            },
            {
                "id": 5,
                "name": "Eco-Grip Yoga Mat",
                "price": 89.00,
                "vendor": "ZenFlow",
                "imageUrl": "https://lh3.googleusercontent.com/aida-public/AB6AXuBM-JOC1SGF6zFsfv-6V6eQPQ_6i23Ss3pfg_A6oITcOm3DjkSd4zhTNWC0Nlb13zO6GLc1aIXX2b1cdoneh8IPCbCn7xVc1Fg6iVtzZrp8ZSrL3xDBYrQWUOnsZ9Ub9O-z1-ZUE-mnK0kQbHWgJjC5HQeBTcvzzCDktkQiK9N_4vtECC2rqe6a4OsGARAN0GBFMRYbsNARuzpB6Z3rB9o4gVmWWkkz9-zUNpAWnWbVqXLNcHkfEVirx8qKTPWdIpiNoNJ2NKfMpJGU",
                "isVerified": False,
                "altText": "Eco-friendly cork surface yoga mat",
                "rating": 4.9,
                "reviews": 198,
                "category": "Sports"
            },
            {
                "id": 6,
                "name": "Premium Skincare Set",
                "price": 129.99,
                "vendor": "GlowNaturals",
                "imageUrl": "https://lh3.googleusercontent.com/aida-public/AB6AXuC1xJ7Xzx14__PLGFOOYuU5omyBNJYaS0ucelpx6UMoZyAiG56NPWM1uelbHmHMDxgk61Z_HsOkym7RgGoggxB3VkhN9-ScxpX7tG6bq-NQvDSnFzr7z1uOdfbwZsoQayhaD8qWCWgOugfg4346mCeZxLSt-iHtHl65Jo4y0QeMnaZsGLR9UFNPWT0cyduBEAcpXcwhK-jDrlIbeea-BA70XwxI3ijq0LqHrJXm9r4XIQgovXzOtvbZG4nwt-MikXFOgj-CPbm1cJ72",
                "isVerified": True,
                "altText": "Natural organic skincare products",
                "rating": 4.7,
                "reviews": 203,
                "category": "Beauty"
            },
            {
                "id": 7,
                "name": "Stainless Steel Blender",
                "price": 179.99,
                "vendor": "KitchenPro",
                "imageUrl": "https://lh3.googleusercontent.com/aida-public/AB6AXuBncgRH84vMSVAFWgNxUKUMwK0eN0cUphWeYeHJlekVuDk-vR6rH6JZJCSxiQBLsr1SJmoDwThQPPKX2XpKd1pLHMXucxdgpFExd2Hra-EhOD6FAbeTXq8llvC0i8MFS4w7V2FhwiPZXYxizZNwOJqWK2yeToxto5bhyxMFKlUKLOkIl5dv4JEG0Yo2uafk68QgloT87NyzDpFhhtY6es6ay_fGILZVp5nJ8C_DNPKDwS8ZaFU7j9MYpPfUxizwLl_TEOTMK5B6F2sV",
                "isVerified": True,
                "altText": "Professional stainless steel blender",
                "rating": 4.8,
                "reviews": 267,
                "category": "Home"
            },
            {
                "id": 8,
                "name": "Kids Educational Puzzle",
                "price": 34.99,
                "vendor": "LearningToys",
                "imageUrl": "https://lh3.googleusercontent.com/aida-public/AB6AXuCzskZWO_yIFkg6zWD-wQaBVwUHG1De5BUV4WCxcTab84ArLB2bAZBhUCRQRXSmfHq7yg2z_POSczx6c5RWm1vTlpJN_OCneraqoDcWd5ul9u-2WgxdEsus4Ud-myT12lsskO2sGeCU2QwlkNYXBeMwzQLYH38hF7O0gFcL7v-jDaH7XArjsbX3os3e1ESKjYDhb6_-IvWGtPx0_cVWQR6TTfWlTN1d5r69_U0qRN3PGMUPNsCnwMtpJZfCk3pHPDJeBVLOmvCS_lH-",
                "isVerified": True,
                "altText": "Colorful educational puzzle set",
                "rating": 4.6,
                "reviews": 145,
                "category": "Kids"
            },
            {
                "id": 9,
                "name": "Vintage Running Shoes",
                "price": 145.00,
                "vendor": "AthleteMark",
                "imageUrl": "https://lh3.googleusercontent.com/aida-public/AB6AXuApGSj7tSF4d5SrfWc8wZwVbSIuuO4Ii1x-cH7E_gK6vLTABMTkdmjxm3PO-jjIYJwzxXr_0RWsoSB3PlegIeVZkzTt9UVHaNLXNMY1lnB05blaS2t5cHMB0ad368zxLelRKHGK6UmZnTyonIBwWnVzAe-aSJwaMLBHAvrzs16icjNzl4sJGn02DImAiOitqpF3fxtrFnfVd5Z_bweJoLLXZT-FsNuIzWeV6oQ6N7KV5nSwYgLTUvjGWTT-H6R1YG6XsUCq1nqiey5G",
                "isVerified": False,
                "altText": "Retro style athletic running shoes",
                "rating": 4.4,
                "reviews": 98,
                "category": "Sports"
            },
            {
                "id": 10,
                "name": "Handmade Ceramic Mug",
                "price": 25.99,
                "vendor": "CeramicArt",
                "imageUrl": "https://lh3.googleusercontent.com/aida-public/AB6AXuDYad76wMBoYCaJnINWvJBggOwCA-tot-V_3m_wg92o3dtYhZi3ULPUnANNCsTq9r7iIoTTQpT7tLjN86tpaECKRiMr9StXDNx-ReuLFWFXDAr9FbbF-D6UET_8-qXLRVkRyyq2VCifwYDAWf6qpZeS4h2jPiQbUQMBZrEso4RoyX2m8ePYtocQbJlglVComWPj2tFIron1O_LQt1mbF9m5FwOgKU6SbYX3vb-s4KBVu-W_GO5B1L6nyeBjtZaBFSucKBKX3YjsYMl9",
                "isVerified": True,
                "altText": "Hand-painted ceramic coffee mug",
                "rating": 4.9,
                "reviews": 312,
                "category": "Home"
            }
        ]

        # Create or get sellers
        sellers_data = {
            "TechWorld": {"email": "techworld@seller.com", "is_verified": True},
            "GreenBean": {"email": "greenbean@seller.com", "is_verified": False},
            "WristCo": {"email": "wristco@seller.com", "is_verified": False},
            "Hide&Sons": {"email": "hideandsons@seller.com", "is_verified": False},
            "ZenFlow": {"email": "zenflow@seller.com", "is_verified": False},
            "GlowNaturals": {"email": "glownaturals@seller.com", "is_verified": True},
            "KitchenPro": {"email": "kitchenpro@seller.com", "is_verified": True},
            "LearningToys": {"email": "learningtoys@seller.com", "is_verified": True},
            "AthleteMark": {"email": "athletemark@seller.com", "is_verified": False},
            "CeramicArt": {"email": "ceramicart@seller.com", "is_verified": True},
        }

        try:
            with transaction.atomic():
                # Clear existing products and sellers
                Product.objects.all().delete()
                Seller.objects.all().delete()
                User.objects.filter(email__endswith='@seller.com').delete()

                # Create sellers and their users
                sellers = {}
                for seller_name, seller_info in sellers_data.items():
                    # Create user
                    user = User.objects.create_user(
                        username=seller_name.lower().replace("&", ""),
                        email=seller_info["email"],
                        password="seller123",
                    )

                    # Create seller
                    seller = Seller.objects.create(
                        user=user,
                        store_name=seller_name,
                    )
                    sellers[seller_name] = user
                    self.stdout.write(
                        self.style.SUCCESS(f'Created seller: {seller_name}')
                    )

                # Create products
                for product_data in products_data:
                    vendor_name = product_data.pop("vendor")
                    image_url = product_data.pop("imageUrl")
                    alt_text = product_data.pop("altText")

                    product = Product.objects.create(
                        seller=sellers[vendor_name],
                        name=product_data["name"],
                        price=product_data["price"],
                        description=alt_text,
                        total_reviews=product_data.get("reviews", 0),
                        rating=product_data.get("rating", 0.0),
                    )

                    # Create product image with image_url stored
                    ProductImage.objects.create(
                        product=product,
                        image=image_url,  # Store URL as filename (temporary solution)
                        alt_text=alt_text,
                        display_order=0
                    )

                    self.stdout.write(
                        self.style.SUCCESS(f'Created product: {product_data["name"]}')
                    )

                self.stdout.write(
                    self.style.SUCCESS('Successfully seeded database with products!')
                )

        except Exception as e:
            self.stdout.write(
                self.style.ERROR(f'Error seeding database: {str(e)}')
            )
            raise
