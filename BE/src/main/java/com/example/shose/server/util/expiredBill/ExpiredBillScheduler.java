package com.example.shose.server.util.expiredBill;

import jakarta.transaction.Transactional;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Scope;
import org.springframework.context.annotation.ScopedProxyMode;
import org.springframework.scheduling.annotation.EnableScheduling;

/**
 * @author thangdt
 */
@Configuration
@EnableScheduling
@Scope(proxyMode = ScopedProxyMode.INTERFACES)
@Transactional
public class ExpiredBillScheduler {

//    @Scheduled(cron = "0 0 3 * * ?")
//    public void scheduledFixedDelayTask(){
//        List<Articles> getList = articlesRepository.getAllArticleTrashService();
//        getList.stream().forEach(item ->{
//            String currentDirectory1 = System.getProperty("user.dir");
//            String folderName = item.getId();
//            String folderPath = currentDirectory1 + "/articles-project/src/main/resources/templates/articles/" + folderName;
//            File folder = new File(folderPath);
//            File[] contents = folder.listFiles();
//            if (contents != null) {
//                for (File file : contents) {
//                    file.delete();
//                }
//            }
//            folder.delete();
//            articlesAlbumRepository.deleteByArticlesId(item.getId());
//            articlesHashtagRepository.deleteByArticlesId(item.getId());
//            commentRepository.deleteByArticlesId(item.getId());
//            articlesRepository.deleteById(item.getId());
//        });
//    }
}
