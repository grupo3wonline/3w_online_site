<script setup>
</script>

<template>
    <div class="pt-20 min-h-screen flex flex-col">
        <section class="bg-slate-900 text-white py-16 text-center relative overflow-hidden">
            <div class="absolute inset-0 bg-brand-900/50"></div>
            <div class="relative z-10 container mx-auto px-6">
                <span class="text-brand-400 font-bold uppercase tracking-wider text-sm">Entre em Contato</span>
                <h1 class="text-3xl md:text-5xl font-bold mt-2 mb-4">Vamos Construir Algo Incrível</h1>
                <p class="text-xl text-slate-300 max-w-xl mx-auto">
                    Nossa equipe de especialistas está pronta para transformar suas necessidades em soluções digitais de alto impacto.
                </p>
            </div>
        </section>

        <section class="flex-grow py-16 bg-white dark:bg-dark-bg">
            <div class="container mx-auto px-6">
                <div class="max-w-6xl mx-auto bg-white dark:bg-dark-panel rounded-2xl shadow-2xl overflow-hidden flex flex-col lg:flex-row">
                    
                    <!-- Contact Info Sidebar -->
                    <div class="lg:w-1/3 bg-brand-900 p-8 text-white flex flex-col justify-between">
                        <div>
                            <h3 class="text-2xl font-bold mb-6">Informações de Contato</h3>
                            <p class="text-brand-100 mb-8 text-sm leading-relaxed">
                                Dúvidas, sugestões ou orçamentos? Preencha o formulário e nossa equipe entrará em contato em até 24h.
                            </p>
                            
                            <ul class="space-y-6">
                                <li class="flex items-start gap-4">
                                    <div class="mt-1 bg-brand-800 p-2 rounded text-brand-400"><i class="fa-solid fa-link"></i></div>
                                    <div>
                                        <p class="font-bold text-sm text-brand-200 uppercase">Website</p>
                                        <p>www.3wonline.com.br</p>
                                    </div>
                                </li>
                                <li class="flex items-start gap-4">
                                    <div class="mt-1 bg-brand-800 p-2 rounded text-brand-400"><i class="fa-solid fa-envelope"></i></div>
                                    <div>
                                        <p class="font-bold text-sm text-brand-200 uppercase">Email</p>
                                        <p>contato@3wonline.com.br</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        
                        <div class="mt-8 pt-8 border-t border-brand-800">
                            <div class="flex gap-4 text-xl text-brand-300">
                                <a href="#" class="hover:text-white transition"><i class="fa-brands fa-instagram"></i></a>
                                <a href="#" class="hover:text-white transition"><i class="fa-brands fa-linkedin"></i></a>
                                <a href="#" class="hover:text-white transition"><i class="fa-brands fa-github"></i></a>
                            </div>
                        </div>
                    </div>

                    <!-- Freshdesk Iframe -->
                    <div class="lg:w-2/3 bg-slate-50 dark:bg-slate-900/50 p-6 md:p-10">
                         <div class="w-full h-full flex items-center justify-center">
                            <div class="w-full bg-white rounded-xl shadow-lg p-1">
                                <iframe 
                                    title="Feedback Form" 
                                    src="https://3wonline.freshdesk.com/widgets/feedback_widget/new?&widgetType=embedded&formTitle=Fale+conosco&submitTitle=Enviar&submitThanks=Mensagem+Enviada+com+Sucesso" 
                                    class="w-full h-[530px] border-0 rounded-lg" 
                                    style="max-width:100%;" 
                                ></iframe>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    </div>
</template>
